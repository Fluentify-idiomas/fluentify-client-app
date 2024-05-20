import { axiosInstance } from "@/api/axios";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  Heading,
  Image
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Cadeado from "/imgs/cadeado.svg";

import { SidebarMenu } from "@/components/SidebarMenu";
import { useAppRouter } from "@/services/router/router.hook";
import Alemao from "/imgs/flags/alemao.svg";
import Espanhol from "/imgs/flags/espanhol.svg";
import Frances from "/imgs/flags/frances.svg";
import Grego from "/imgs/flags/grego.svg";
import Holandes from "/imgs/flags/holandes.svg";
import Ingles from "/imgs/flags/ingles.svg";

export type LangsType = {
  id: number;
  name: string;
  image?: string;
  isBlocked?: boolean;
};

export function Home() {
  // const { handleSignOut } = useAuthentication();
  const [langs, setLangs] = useState<LangsType[]>([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { navigateTo } = useAppRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosInstance.get("/langs");
        const resultData = result.data;

        if (resultData.error) throw new Error();

        const languagesWithImages = resultData.list_langs.map(
          (lang: LangsType) => {
            switch (lang.id) {
              case 1:
                return { ...lang, image: Ingles, isBlocked: false };
              case 2:
                return { ...lang, image: Espanhol, isBlocked: true };
              case 3:
                return { ...lang, image: Frances, isBlocked: true };
              case 4:
                return { ...lang, image: Alemao, isBlocked: true };
              case 5:
                return { ...lang, image: Holandes, isBlocked: true };
              case 6:
                return { ...lang, image: Grego, isBlocked: true };
              default:
                return lang;
            }
          }
        );

        setLangs(languagesWithImages);
        setHasFetched(true);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (!hasFetched) {
      fetchData();
    }
  }, [hasFetched]);

  useEffect(() => {
    if (langs.length > 0) {
      console.log(langs);
    }
  }, [langs]);

  return (
    <Flex>
      <SidebarMenu />
      <Flex justify="center" align="center">
        <Flex
          w="86vw"
          h="100vh"
          direction="column"
          align="center"
          justify="center"
        >
          <Heading mb="12px" fontSize="4rem" textAlign="center" color="#FC7CFF">
            Cursos
          </Heading>
          <Flex justify="center" align="center" w="80%">
            <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
              {langs.map((lang) => (
                <Box
                  key={lang.id}
                  m="20px"
                  onMouseEnter={() => {
                    setHoveredCard(lang.id);
                  }}
                  onMouseLeave={() => setHoveredCard(null)}
                  transition="transform 0.3s"
                  transform={
                    hoveredCard === lang.id ? "scale(1.05)" : "scale(1)"
                  }
                  cursor={
                    hoveredCard === lang.id && !lang.isBlocked
                      ? "pointer"
                      : "not-allowed"
                  }
                >
                  <Card
                    _hover={{ border: '1px solid #FC7CFF' }}
                    border="1px solid #8FFF7C"
                    bgColor="#51488B"
                    borderRadius="24px"
                    color="white"
                    textAlign="center"
                    p="20px"
                    onClick={() => {
                      if (!lang.isBlocked) navigateTo(`/level/${lang.id}`);
                    }}
                  >
                    <CardBody
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      position="relative"
                    >
                      {lang.image && (
                        <Image
                          w="100%"
                          h="100%"
                          src={lang.image}
                          opacity={lang.isBlocked ? 0.1 : 1}
                        />
                      )}
                      {lang.isBlocked && (
                        <Image
                          src={Cadeado}
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          w="50%"
                        />
                      )}
                      <Heading fontSize="2.2rem" mt={4} pt="12px">
                        {lang.name}
                      </Heading>
                    </CardBody>
                  </Card>
                </Box>
              ))}
            </Grid>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
