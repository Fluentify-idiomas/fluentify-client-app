import {
  Flex,
  Heading
} from "@chakra-ui/react";
import { ReactNode } from "react";
import HeaderAuth from "./HeaderAuth";

interface BoxAuthProps {
  children: ReactNode;
}

export function BoxAuth({children}: BoxAuthProps) {

  return (
    <Flex direction="column" w="100vw" h="100vh">
      <HeaderAuth />
      <Heading fontSize="2.5rem" fontWeight="bold" mb="35px" alignSelf='center'>
        FLUENTIFY
      </Heading>
      <Flex align="center" justify="center">
        <Flex
          direction="column"
          p="40px 36px 15px 36px"
          bgColor="#26074D"
          w="100%"
          maxWidth='648px'
          borderRadius="24px"
          shadow="0px 4px 4px 5px rgba(252, 124, 255, 1)"
        >
        {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
