import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  Heading,
  Image,
  Text
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { axiosInstance } from "@/api/axios";
import { useEffect, useState } from "react";

import { SidebarMenu } from "@/components/SidebarMenu";
import Cadeado from "/imgs/cadeado.svg";
import ManAstronaut from "/imgs/man-astronaut.svg";
import WomanAstronaut from "/imgs/woman-astrounaut.svg";

type LevelType = {
  id: number;
  name: string;
  isBlocked?: boolean;
};

// export type LangInfo = {
//   id: number;
//   name: string;
//   levels: LevelType[]
// }

export function Level() {
  let { id } = useParams();

  const [levels, setLevels] = useState<LevelType[]>([]);

  const [hasFetched, setHasFetched] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // const { navigateTo } = useAppRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosInstance.get(`/levels/${id}`);
        const resultData = result.data;

        console.log(resultData)

        const moduleList = resultData.module_list;
        
        const moduleListMocked = moduleList.map((mod: any) => {
          if (mod.id == 1) {
            return {
              ...mod,
              isBlocked: false,
            }
          } else {
            return {
              ...mod,
              isBlocked: true,
            }
          }

        });

        setLevels(moduleListMocked);

        if (resultData.error) throw new Error();

        setHasFetched(true);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (!hasFetched) {
      fetchData();
    }
  }, [hasFetched]);

  return (
    <Flex>
      <SidebarMenu />
      <Flex
        w="86vw"
        minHeight="100vh"
        direction="column"
        align="center"
        justify="center"
      >
        <Heading color='#8FFF7C' mb="32px" fontSize="4rem" textAlign="center">
          Níveis
        </Heading>
        <Flex w="100%" justify="center" align="center" mt='40px' mb='40px'>
          <Text
            // mb="60px"
            fontWeight="bold"
            fontSize="2.4rem"
            textAlign="center"
          >
            Vamos melhorar seu{" "}
            <Text as="span" color="#FC7CFF">
              Nível
            </Text>{" "}
            em{" "}
            <Text as="span" color="#8FFF7C">
              inglês!
            </Text>
          </Text>
        </Flex>
        <Flex justify="center" align="center" w="80%">
          <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
            {levels.map((level) => (
              <Box
                key={level.id}
                m="20px"
                onMouseEnter={() => {
                  setHoveredCard(level.id);
                }}
                onMouseLeave={() => setHoveredCard(null)}
                transition="transform 0.3s"
                transform={
                  hoveredCard === level.id ? "scale(1.05)" : "scale(1)"
                }
                cursor={
                  hoveredCard === level.id && !level.isBlocked
                    ? "pointer"
                    : "not-allowed"
                }
                onClick={() => {
                  // if (!level.isBlocked) navigateTo(`/module/${level.id}`)
                }}
              >
                <Card
                _hover={{ border: '1px solid #8FFF7C' }}
                  border='1px solid #FC7CFF'
                  bgColor="#51488B"
                  borderRadius="24px"
                  color="white"
                  textAlign="center"
                  p="20px"
                >
                  <CardBody
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                  >
                    {level.isBlocked && (
                      <Image
                        src={Cadeado}
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        w="26%"
                      />
                    )}
                    <Heading fontSize="2.2rem" mt={4} pt="12px">
                      {level.name}
                    </Heading>
                  </CardBody>
                </Card>
              </Box>
            ))}
          </Grid>
        </Flex>
        <Flex justify='space-around'>
          <Image w='32%' mt='32px' src={WomanAstronaut}></Image>
          <Image w='30%' mt='32px' src={ManAstronaut}></Image>
        </Flex>
      </Flex>
    </Flex>
  );
}
