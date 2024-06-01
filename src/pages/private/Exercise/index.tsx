import { useAppRouter } from "@/services/router/router.hook";
import {
  Flex,
  Heading,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TranslateIcon from "/imgs/translate-icon.svg";
import BookIcon from "/imgs/book-icon.svg";
import ModelsIcon from "/imgs/models-icon.svg";

import LeftArrow from "/imgs/left-arrow.svg";
import RightArrow from "/imgs/right-arrow.svg";

import { useExercise } from "./exercise.hook";
import { IExercise, ExercisesInfo, TextsEnunciated } from "./exercise.provider";
import { userSessionStorageToken } from "@/services/auth/auth.provider";
import { axiosInstance } from "@/api/axios";

enum TranslateEnum {
  PT_BR = "pt_br",
  EN = "en",
}

const MAX_NUMBER_PAGE = 10;
const MIN_NUMBER_PAGE = 1;

export function Exercise() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let { module_id } = useParams();

  const { getModuleExercises, seeData } = useExercise();
  const { navigateTo } = useAppRouter();

  const [hasFetched, setHasFetched] = useState(false);

  const [textBase, setTextBase] = useState({} as TextsEnunciated);
  const [exerciseInfo, setExerciseInfo] = useState({} as ExercisesInfo);

  const [exerciseOptions, setExerciseOptions] = useState([] as string[]);

  const [currentLanguage, setCurrentLanguage] = useState(TranslateEnum.EN);
  const [currentPage, setCurrentPage] = useState(MIN_NUMBER_PAGE);
  const [currentTextContent, setCurrentTextContent] = useState([] as string[]);

  function switchCurrentLanguage() {
    if (currentLanguage == TranslateEnum.PT_BR)
      setCurrentLanguage(TranslateEnum.EN);
    else setCurrentLanguage(TranslateEnum.PT_BR);
  }

  function navigateBetweenPages(navigateType: "BACK" | "NEXT") {
    if (navigateType == "BACK" && currentPage > MIN_NUMBER_PAGE)
      setCurrentPage(currentPage - 1);
    else if (navigateType == "NEXT" && currentPage < MAX_NUMBER_PAGE)
      setCurrentPage(currentPage + 1);
  }

  function transformTextExercises() {
    const currentPageForIndex = currentPage - 1;

    const isExerciseInfoEmpty = Object.keys(exerciseInfo).length == 0;

    if (!isExerciseInfoEmpty) {
      const currentExercise: IExercise =
        exerciseInfo.exercises[currentPageForIndex];

      const currentExerciseFormatted =
        currentExercise[`text_content_${currentLanguage}`].split("\n");

      setCurrentTextContent(currentExerciseFormatted);
    }
  }

  function transformOptionsExercises() {
    const currentPageForIndex = currentPage - 1;
    const isExerciseInfoEmpty = Object.keys(exerciseInfo).length == 0;

    if (!isExerciseInfoEmpty) {
      const exercise = exerciseInfo.exercises[currentPageForIndex];

      const exerciseOptions = [
        exercise.option1,
        exercise.option2,
        exercise.option3,
        exercise.option4,
        exercise.option5,
      ];

      setExerciseOptions(exerciseOptions);
    }
  }

  useEffect(() => {
    transformOptionsExercises();
  }, [exerciseInfo, currentPage]);

  useEffect(() => {
    if (exerciseInfo && currentPage && currentTextContent)
      transformTextExercises();
  }, [currentLanguage, exerciseInfo, currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moduleExercises = await getModuleExercises(Number(module_id));

        setTextBase(moduleExercises.texts_enunciated[0]);
        setExerciseInfo(moduleExercises);

        transformTextExercises();

        setHasFetched(true);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (!hasFetched) {
      fetchData();
    }
  }, [hasFetched, exerciseInfo]);

  async function sendAnswer(indexOption: number) {
    const user_id = sessionStorage.getItem(userSessionStorageToken);
    const option_choice = indexOption + 1;

    const currentPageForIndex = currentPage - 1;
    const exercise = exerciseInfo.exercises[currentPageForIndex];

    const { exercise_id } = exercise;

    const payload = {
      user_id,
      option_choice,
      exercise_id,
    };

    try {
      const result = await axiosInstance.post("/exercises/correction", payload);

      const resultData = result.data;

      console.log(resultData);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Flex direction="column">
      <Flex
        h="10vh"
        justify="space-between"
        align="center"
        w="100vw"
        px="64px"
        pt="16px"
      >
        <Flex
          cursor="pointer"
          onClick={switchCurrentLanguage}
          direction="column"
          align="center"
        >
          <Image src={TranslateIcon} />
          <Text fontSize="1.2rem">
            {currentLanguage == TranslateEnum.PT_BR ? "Traduzir" : "Translate"}
          </Text>
        </Flex>
        <Heading color="#8FFF7C" fontSize="4.4rem">
          {currentLanguage == TranslateEnum.PT_BR ? "Exercícios" : "Exercises"}
        </Heading>
        <Flex cursor="pointer">
          <Image src={ModelsIcon} />
        </Flex>
      </Flex>
      <Flex>
        <Flex w="60vw" h="76vh" minH="76vh" justify="center" align="center">
          <Stack fontSize="2.4rem">
            <Text mb="16px">
              {currentTextContent.map((text, index) =>
                index == 0 ? (
                  <Text fontWeight="bold" key={index}>{text}</Text>
                ) : (
                  <Text key={index}>{text}</Text>
                )
              )}
            </Text>
          </Stack>
        </Flex>
        <Flex w="40vw" h="76vh" justify="center" align="center">
          <Stack fontSize="1.8rem" fontWeight="bold">
            {exerciseOptions.map((exerciseOption, index) => (
              <Text
                bgColor="#8B64B0"
                p="8px 16px"
                my="4px"
                borderRadius="20px"
                key={index}
                onClick={() => sendAnswer(index)}
                cursor='pointer'
                _hover={{
                  color: 'black',
                  bgColor: '#8B64EF'
                }}
              >
                {exerciseOption}
              </Text>
            ))}
          </Stack>
        </Flex>
      </Flex>
      <Flex w="100vw" h="14vh" justify="space-between" px="4%" align="center">
        <Flex
          fontWeight="bold"
          fontSize="1.6rem"
          bgColor="#B12FB4"
          p="0.8rem"
          borderRadius="20px"
          h="60%"
          align="center"
          onClick={onOpen}
          _hover={{
            cursor: "pointer",
            bgColor: "rgba(177, 47, 180, 0.6)",
          }}
        >
          <Image src={BookIcon} w="20%" />
          <Text ml="0.6rem">
            {currentLanguage == TranslateEnum.PT_BR
              ? "Mostrar texto"
              : "Show Text"}
          </Text>
        </Flex>
        <Flex
          direction="column"
          fontWeight="bold"
          fontSize="1.4rem"
          align="center"
        >
          <Stack direction="row" fontSize="2rem">
            <Image
              cursor="pointer"
              bgColor="#171717"
              p="16px 24px"
              borderRadius="24px"
              src={LeftArrow}
              onClick={() => navigateBetweenPages("BACK")}
              mx="4px"
              _hover={{
                bgColor: "rgba(255, 255, 255, 0.5)",
                color: "black",
              }}
            />
            <Image
              cursor="pointer"
              bgColor="#171717"
              p="16px 24px"
              borderRadius="24px"
              src={RightArrow}
              onClick={() => navigateBetweenPages("NEXT")}
              mx="4px"
              _hover={{
                bgColor: "rgba(255, 255, 255, 0.5)",
                color: "black",
              }}
            />
          </Stack>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="6xl">
        <ModalOverlay></ModalOverlay>
        <ModalContent
          w="100vw"
          h="60vh"
          background="linear-gradient(to right, #10002B, #5A189A)"
          borderRadius="24px"
          p="32px"
          overflowY="scroll"
          css={{
            "&::-webkit-scrollbar": {
              width: "16px",
              borderRadius: "32px",
              backgroundColor: "black",
              marginRight: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(177, 47, 180, 1)",
              borderRadius: "32px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "gray.100",
              borderRadius: "32px",
            },
          }}
        >
          <ModalHeader>
            <Flex justify="flex-end">
              <Text
                textColor="black"
                fontWeight="bold"
                textAlign="end"
                fontSize="2.4rem"
                border="2px solid black"
                px="24px"
                borderRadius="24px"
                onClick={onClose}
                cursor="pointer"
                _hover={{
                  bgColor: "#FF00FF",
                }}
              >
                X
              </Text>
            </Flex>
          </ModalHeader>
          <Flex justify="center" align="center" direction="column">
            <Heading mb="2rem" fontSize="2.6rem">
              {currentLanguage == TranslateEnum.PT_BR
                ? "Texto para exercícios"
                : "Text for exercises"}
            </Heading>
            <Stack fontSize="2.2rem">
              <Text mb="2rem">
                {textBase[`text_content_${currentLanguage}`]}
              </Text>
            </Stack>
          </Flex>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
