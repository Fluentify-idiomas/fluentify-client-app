import { useAppRouter } from "@/services/router/router.hook";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
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
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BookIcon from "/imgs/book-icon.svg";
import ModelsIcon from "/imgs/models-icon.svg";
import TranslateIcon from "/imgs/translate-icon.svg";

import LeftArrow from "/imgs/left-arrow.svg";
import RightArrow from "/imgs/right-arrow.svg";

import CongratulationsGif from "/gifs/gerbert-congratulations.gif";
import WrongsGif from "/gifs/gerbert-wrong.gif";
import FinishedGif from "/gifs/gerbert-finished.gif";

import { axiosInstance } from "@/api/axios";
import { userSessionStorageToken } from "@/services/auth/auth.provider";
import { useExercise } from "./exercise.hook";
import { ExercisesInfo, IExercise } from "./exercise.provider";

enum TranslateEnum {
  PT_BR = "pt_br",
  EN = "en",
}
interface exerciseOptions {
  text: string;
  isBlocked: boolean;
  isRight?: boolean;
}

export interface TextsEnunciatedTransformed {
  text_content_en: string[];
  text_content_pt_br: string[];
}

const MAX_NUMBER_PAGE = 6;
const MIN_NUMBER_PAGE = 1;
const MAX_EXERCISES_NUMBER = 6;

export function Exercise() {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const {
    isOpen: isConclusionModalOpen,
    onOpen: onConclusionModalOpen,
    onClose: onConclusionModalClose,
  } = useDisclosure();

  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const toast = useToast();

  let { module_id, level_id } = useParams();

  const { getModuleExercises } = useExercise();
  const { navigateTo } = useAppRouter();

  const [hasFetched, setHasFetched] = useState(false);

  const [quantityExerciseRight, setQuantityExerciseRight] = useState<number>(0);

  const [textBase, setTextBase] = useState<TextsEnunciatedTransformed>();
  const [exerciseInfo, setExerciseInfo] = useState({} as ExercisesInfo);

  const [exerciseOptionsTest, setExerciseOptionsTest] =
    useState<exerciseOptions[][]>();

  const [currentLanguage, setCurrentLanguage] = useState(TranslateEnum.EN);
  const [currentPage, setCurrentPage] = useState(MIN_NUMBER_PAGE);
  const [currentTextContent, setCurrentTextContent] = useState([] as string[]);

  useEffect(() => {
    if (quantityExerciseRight == MAX_EXERCISES_NUMBER) {
      onConclusionModalOpen();

      setTimeout(() => {
        onConclusionModalClose();
        navigateTo(`/module/${module_id}`);
      }, 5_000);
    }
  }, [quantityExerciseRight]);

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

  useEffect(() => {
    if (exerciseInfo && currentPage && currentTextContent)
      transformTextExercises();
  }, [currentLanguage, exerciseInfo, currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moduleExercises = await getModuleExercises(Number(module_id));

        const text_content_pt_br: string[] =
          moduleExercises.texts_enunciated[0].text_content_pt_br.split("\n");
        const text_content_en: string[] =
          moduleExercises.texts_enunciated[0].text_content_en.split("\n");

        const textsEnunciatedTransformed: TextsEnunciatedTransformed = {
          text_content_pt_br,
          text_content_en,
        };

        const exerciseOptionsArray: exerciseOptions[][] = [];

        const exerciseQuantity = moduleExercises.exercises.length;

        for (let i = 0; i < exerciseQuantity; i++) {
          const currentExercise = moduleExercises.exercises[i];

          exerciseOptionsArray.push([]);

          const { option1, option2, option3, option4, option5 } =
            currentExercise;

          exerciseOptionsArray[i] = [
            {
              text: option1,
              isBlocked: false,
            },
            {
              text: option2,
              isBlocked: false,
            },
            {
              text: option3,
              isBlocked: false,
            },
            {
              text: option4,
              isBlocked: false,
            },
            {
              text: option5,
              isBlocked: false,
            },
          ];
        }

        setExerciseOptionsTest(exerciseOptionsArray);

        setTextBase(textsEnunciatedTransformed);
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

  async function sendAnswer(indexOption: number, isBlocked: boolean) {
    if (isBlocked) return;

    const user_id = sessionStorage.getItem(userSessionStorageToken);
    const option_choice = indexOption + 1;

    const currentPageForIndex = currentPage - 1;
    const exercise = exerciseInfo.exercises[currentPageForIndex];

    const { exercise_id } = exercise;

    const payload = {
      user_id,
      option_choice,
      exercise_id,
      lang_id: 1, // Ta fixo inglês
    };

    try {
      const result = await axiosInstance.post("/exercises/correction", payload);

      const resultData = result.data;

      if (resultData.correct_exercise == true && exerciseOptionsTest) {
        const newExerciseOptionsTest = [...exerciseOptionsTest];
        const currentExercise = currentPage - 1;
        const currentOption = option_choice - 1;

        newExerciseOptionsTest[currentExercise] = [
          ...newExerciseOptionsTest[currentExercise],
        ];

        newExerciseOptionsTest[currentExercise][currentOption].isRight = true;

        for (let i = 0; i < 5; i++) {
          newExerciseOptionsTest[currentExercise][i].isBlocked = true;
        }

        setExerciseOptionsTest(newExerciseOptionsTest);

        toast({
          duration: 1000,
          isClosable: true,
          render: () => (
            <Flex
              bgColor="green"
              h="20vh"
              borderRadius="12px"
              justify="center"
              align="center"
              px="24px"
              py="16px"
              justifyContent="space-around"
            >
              <Image src={CongratulationsGif} w="40%" />
              <Text ml="20px" fontWeight="bold" fontSize="2rem" color="#FFFFFF">
                Congratulations!
              </Text>
            </Flex>
          ),
        });

        setQuantityExerciseRight(quantityExerciseRight + 1);
      } else {
        toast({
          duration: 1000,
          position: "bottom",
          render: () => (
            <Flex
              bgColor="red"
              h="20vh"
              borderRadius="12px"
              justify="center"
              align="center"
              px="24px"
              py="16px"
            >
              <Image src={WrongsGif} w="40%" />
              <Text fontWeight="bold" fontSize="2rem" color="black">
                Wrong, Try again!
              </Text>
            </Flex>
          ),
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Flex direction="column" maxH="100vh">
      <Flex
        justify="space-between"
        align="center"
        w="100vw"
        px="64px"
        pt="20px"
      >
        <Flex
          direction="column"
          cursor="pointer"
          align="center"
          bgColor="#4B195C"
          borderRadius="24px"
          p="8px 16px"
          _hover={{
            bgColor: "#8B64EF",
          }}
          onClick={() => {
            onAlertOpen();
          }}
        >
          <Image src={ModelsIcon} />
          <Text fontSize="1.2rem" mt="8px">
            {currentLanguage == TranslateEnum.PT_BR
              ? "Voltar ao Módulo"
              : "Back to Module"}
          </Text>
        </Flex>
        <Heading color="#8FFF7C" fontSize="4.4rem">
          {currentLanguage == TranslateEnum.PT_BR ? "Exercícios" : "Exercises"}
        </Heading>
        <Flex
          cursor="pointer"
          onClick={switchCurrentLanguage}
          direction="column"
          align="center"
          bgColor="#4B195C"
          borderRadius="24px"
          p="8px 36px"
          _hover={{
            color: "black",
            bgColor: "#8B64EF",
          }}
        >
          <Image src={TranslateIcon} />
          <Text fontSize="1.2rem" mt="8px">
            {currentLanguage == TranslateEnum.PT_BR ? "Traduzir" : "Traduzir"}
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Flex w="60vw" h="76vh" minH="76vh" justify="center" align="center">
          <Stack fontSize="2.4rem">
            <Text mb="16px">
              {currentTextContent.map((text, index) =>
                index == 0 ? (
                  <Text fontWeight="bold" key={index}>
                    {text}
                  </Text>
                ) : (
                  <Text key={index}>{text}</Text>
                )
              )}
            </Text>
          </Stack>
        </Flex>
        <Flex w="40vw" h="76vh" justify="center" align="center">
          <Stack fontSize="1.8rem" fontWeight="bold">
            {exerciseOptionsTest &&
              currentPage &&
              exerciseOptionsTest[currentPage - 1].map(
                (currentOption, index) => (
                  <Text
                    bgColor={
                      currentOption.isRight == true ? "green" : "#8B64B0"
                    }
                    p="8px 16px"
                    my="4px"
                    borderRadius="20px"
                    key={index}
                    onClick={() => sendAnswer(index, currentOption.isBlocked)}
                    cursor="pointer"
                    _hover={{
                      cursor: currentOption.isBlocked
                        ? "not-allowed"
                        : "pointer",
                      color: "black",
                      bgColor:
                        currentOption.isRight == true ? "green" : "#8B64EF",
                    }}
                  >
                    {currentOption.text}
                  </Text>
                )
              )}
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
          onClick={onModalOpen}
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
          position="relative"
        >
          <Stack direction="row" fontSize="2rem">
            <Image
              cursor={
                currentPage == MIN_NUMBER_PAGE ? "not-allowed" : "pointer"
              }
              bgColor={currentPage == MIN_NUMBER_PAGE ? "#17171780" : "#171717"}
              p="16px 24px"
              borderRadius="24px"
              src={LeftArrow}
              onClick={() => navigateBetweenPages("BACK")}
              mx="4px"
              _hover={{
                bgColor:
                  currentPage == MIN_NUMBER_PAGE
                    ? "#17171780"
                    : "rgba(255, 255, 255, 0.5)",
              }}
            />
            <Image
              cursor={
                currentPage == MAX_NUMBER_PAGE ? "not-allowed" : "pointer"
              }
              bgColor={currentPage == MAX_NUMBER_PAGE ? "#17171780" : "#171717"}
              p="16px 24px"
              borderRadius="24px"
              src={RightArrow}
              onClick={() => navigateBetweenPages("NEXT")}
              mx="4px"
              _hover={{
                bgColor:
                  currentPage == MAX_NUMBER_PAGE
                    ? "#17171780"
                    : "rgba(255, 255, 255, 0.5)",
              }}
            />
          </Stack>
        </Flex>
      </Flex>
      <Modal
        isOpen={isModalOpen}
        onClose={onModalClose}
        isCentered={true}
        size="6xl"
      >
        <ModalOverlay bgColor="#000000dd" />
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
                onClick={onModalClose}
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
              {!!textBase &&
                textBase[`text_content_${currentLanguage}`].map((text) => (
                  <Text mb="2rem">{text}</Text>
                ))}
            </Stack>
          </Flex>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isConclusionModalOpen}
        onClose={onConclusionModalClose}
        isCentered={true}
        size="6xl"
      >
        <ModalOverlay bgColor="#000000dd" />
        <ModalContent
          w="40vw"
          h="50vh"
          background="linear-gradient(to right, #10002B, #5A189A)"
          borderRadius="24px"
          p="32px"
        >
          <ModalHeader>
            <Heading mb="2rem" textAlign="center" fontSize="2.6rem">
              Módulo Finalizado!!!
            </Heading>
          </ModalHeader>
          <Flex justify="center" align="center" direction="column">
            <Image
              borderBottom="1px solid black"
              borderRadius="18px"
              src={FinishedGif}
              w="40%"
            />
            <Text fontWeight="bold" fontSize="1.2rem" mt="8px">
              Voltando em 5 segundos.
            </Text>
          </Flex>
        </ModalContent>
      </Modal>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
        isOpen={isAlertOpen}
        isCentered
      >
        <AlertDialogOverlay bgColor="#000000dd" />

        <AlertDialogContent>
          <AlertDialogHeader>Cuidado!</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Ao sair todo seu progresso neste módulo será perdido.
            <br />
            <br />
            Tem certeza que deseja prosseguir ?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onAlertClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                navigateTo(`/module/${level_id}`);
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
}
