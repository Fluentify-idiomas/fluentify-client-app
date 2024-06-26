import { axiosInstance } from "@/api/axios";
import { SidebarMenu } from "@/components/SidebarMenu";
import { useAppRouter } from "@/services/router/router.hook";
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
import { useParams } from "react-router-dom";

import { userSessionStorageToken } from "@/services/auth/auth.provider";
import Cadeado from "/imgs/cadeado.svg";

type ModuleItemType = {
  id: number;
  name: string;
  is_blocked: boolean;
};

type LangInfoType = {
  id: number;
  description: string;
  name: string;
};

type ModuleType = {
  error: any;
  lang_info: LangInfoType;
  module_list: ModuleItemType[];
  level_id?: number;
};

export function Module() {
  const { id } = useParams();

  const [modules, setModules] = useState<ModuleType>({
    error: null,
    lang_info: {} as LangInfoType,
    module_list: [],
  } as ModuleType);

  const [hasFetched, setHasFetched] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const [levelId, setLevelId] = useState<number>();

  const { navigateTo } = useAppRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = sessionStorage.getItem(userSessionStorageToken);

        const payload = {
          user_id: auth,
          lang_id: 1, // Fixo inglẽs,
          level_id: id,
        }

        const result = await axiosInstance.post('/modules', payload);
        const resultData: ModuleType = result.data;

        setLevelId(resultData.level_id);

        setModules(resultData);

        setHasFetched(true);
      } catch (err) {
        console.log(err);
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
        <Heading color="#8FFF7C" mb="32px" fontSize="4rem" textAlign="center">
          Módulo { modules.lang_info.name && `(${modules.lang_info.name})` }
        </Heading>
        <Flex justify="center" align="center" w="80%">
          <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
            {modules.module_list.length > 0 &&
              modules.module_list.map((moduleItem) => (
                <Box
                  key={moduleItem.id}
                  m="20px"
                  onMouseEnter={() => {
                    setHoveredCard(moduleItem.id);
                  }}
                  onMouseLeave={() => setHoveredCard(null)}
                  transition="transform 0.3s"
                  transform={
                    hoveredCard === moduleItem.id ? "scale(1.05)" : "scale(1)"
                  }
                  cursor={
                    hoveredCard === moduleItem.id && !moduleItem.is_blocked
                      ? "pointer"
                      : "not-allowed"
                  }
                  onClick={() => {
                    if (!moduleItem.is_blocked) navigateTo(`/exercises/${moduleItem.id}/${levelId}`);
                  }}
                >
                  <Card
                    _hover={{ border: "1px solid #8FFF7C" }}
                    border="1px solid #FC7CFF"
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
                      {moduleItem.is_blocked && (
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
                        {moduleItem.name}
                      </Heading>
                    </CardBody>
                  </Card>
                </Box>
              ))}
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  );
}
