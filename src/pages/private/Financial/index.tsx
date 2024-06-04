import { axiosInstance } from "@/api/axios";
import { userSessionStorageToken } from "@/services/auth/auth.provider";
import {
  Flex,
  Heading,
  ListItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppRouter } from "@/services/router/router.hook";

export function Financial() {
  const [preferenceId, setPreferenceId] = useState<string>();
  const [userId, setUserId] = useState<string>();

  const { navigateTo } = useAppRouter();

  useEffect(() => {
    let intervalId: number;
    if (userId && preferenceId) {
      intervalId = setInterval(() => {
        verifyPaymentStatus();
      }, 5000); // 5000ms = 5 seconds
    }
    return () => clearInterval(intervalId);
  }, [userId, preferenceId]);

  async function redirectToCheckout() {
    const user_id = sessionStorage.getItem(userSessionStorageToken);

    const payload = {
      user_id: user_id,
      plan_id: 2, // Id Fixo
    };

    const result = await axiosInstance.post("/checkout", payload);

    const urlCheckout = result.data.payment_info.url_checkout;

    const urlObj = new URL(urlCheckout);
    const prefId = urlObj.searchParams.get("pref_id");

    if (prefId && user_id) {
      setPreferenceId(prefId);
      setUserId(user_id);
    }

    window.open(urlCheckout);
  }

  async function verifyPaymentStatus() {
    const payload = {
      user_id: userId,
      preference_id: preferenceId,
      plan_id: 2,
    };

    const result = await axiosInstance.post("/checkout/verify", payload);

    const { approved } = result.data;

    if (approved) navigateTo('/home');
  }

  return (
    <Flex>
      <Flex justify="center" align="center">
        <Flex
          mt="100px"
          w="100vw"
          direction="column"
          align="center"
          justify="center"
        >
          <Flex justify="center" align="center" w="80%"></Flex>
        </Flex>
      </Flex>
      <Modal isOpen={true} onClose={() => {}} isCentered={true} size="6xl">
        <ModalOverlay bgColor="#00000099" />
        <ModalContent
          w="60vw"
          h="60vh"
          background="linear-gradient(to right, #10004F, #5A189A)"
          borderRadius="24px"
          p="32px"
          justifyContent="space-between"
          alignItems="center"
        >
          <ModalHeader>
            <Heading
              mb="12px"
              fontSize="4rem"
              textAlign="center"
              color="#FC7CFF"
            >
              Fluentify
            </Heading>
          </ModalHeader>
          <Stack justifyContent="space-between" h="40%">
            <Text
              fontWeight="bold"
              fontSize={{ base: "1rem", md: "1rem", lg: "1.4rem", xl: "2rem" }}
            >
              Prezado usuário, é necessário realizar o pagamento para acessar os
              cursos de idiomas.
            </Text>
            <UnorderedList>
              <Text as="span" color="red">
                IMPORTANTE:
              </Text>
              <ListItem>
                - Após realizar o pagamento fique nessa tela e aguarde o
                redirecionamento.
              </ListItem>
              <ListItem>
                - Pagamento será realizado para a seguinte empresa: THENORIAN
              </ListItem>
            </UnorderedList>
          </Stack>
          <Text
            fontSize={{
              base: "1rem",
              md: "1.2rem",
              lg: "1.4rem",
              xl: "1.4rem",
            }}
            fontWeight="bold"
            borderRadius="24px"
            backgroundColor="#800080"
            px="32px"
            py={{ base: "10px", md: "8px", lg: "10px", xl: "16px" }}
            cursor="pointer"
            _hover={{
              bgColor: "#800080cc",
              color: "#FFFFFFc0",
            }}
            onClick={() => {
              redirectToCheckout();
            }}
          >
            Ir para tela de pagamento
          </Text>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
