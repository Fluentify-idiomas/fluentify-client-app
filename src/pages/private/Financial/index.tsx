import { axiosInstance } from "@/api/axios";
import { useAuthentication } from "@/services/auth/auth.hook";
import { userSessionStorageToken } from "@/services/auth/auth.provider";
import {
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

export function Financial() {

  async function redirectToCheckout() {
    const user_id = sessionStorage.getItem(userSessionStorageToken);

    const payload = {
      user_id: user_id,
      plan_id: 1, // Id Fixo
    }

    const result = await axiosInstance.post('/checkout', payload);

    const urlCheckout = result.data.payment_info.url_checkout;

    window.open(urlCheckout);
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
        <ModalOverlay bgColor="#000000bb" />
        <ModalContent
          w="40vw"
          h="44vh"
          background="linear-gradient(to right, #10002B, #5A189A)"
          borderRadius="24px"
          p="32px"
        >
          <ModalHeader>
            <Heading
              mb="12px"
              fontSize="4rem"
              textAlign="center"
              color="#FC7CFF"
            >
              Financeiro
            </Heading>
          </ModalHeader>
          <Flex justify="center" align="center" direction="column" px="16px">
            <Text fontWeight="bold" fontSize="1.4rem" mt="8px">
              Para a sua segurança o pagamento deve ser realizado via Mercado
              Pago.
            </Text>
            <Text
              fontWeight="bold"
              fontSize="1.4rem"
              mt="64px"
              borderRadius='24px'
              backgroundColor="#800080"
              px='32px'
              py='16px'
              cursor='pointer'
              _hover={{
                bgColor: '#800080cc',
                color: '#FFFFFFc0'
              }}
              onClick={() => {
                redirectToCheckout();
              }}
            >
              Ir para tela de pagamento
            </Text>
          </Flex>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
