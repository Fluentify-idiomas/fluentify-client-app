import { useAuthentication } from "@/services/auth/auth.hook";
import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { RiLogoutBoxLine } from "react-icons/ri";

import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

export function SidebarMenu() {
  const { handleSignOut } = useAuthentication();

  const links = [
    {
      name: "Home",
      link: "/home",
    },
    {
      name: "Usuário",
      link: "/home",
    },
    {
      name: "Financeiro",
      link: "/home",
    },
    {
      name: "Suporte",
      link: "/home",
    },
  ];

  return (
    <Flex
      w="14vw"
      bgColor="gray.800"
      minHeight="100vh"
      align="center"
      justify="space-between"
      direction="column"
    >
      <Heading mt="40px">FLUENTIFY</Heading>
      <Flex direction="column" textAlign="center">
        {links &&
          links.map((link) => (
            <ChakraLink as={ReactRouterLink}
              to={link.link}
              _hover={{ bgColor: '#FC7CFF' }}
              borderRadius="24px"
              color="#0F0F0F"
              bgColor="#8FFF7C"
              p="8px 16px"
              textDecoration="none"
              mb="32px"
              fontSize="1.4rem"
            >
              {link.name}
            </ChakraLink>
          ))}
      </Flex>
      <Flex width="100%" justify="center">
        <ChakraLink mb="28px" onClick={handleSignOut}>
          <Flex justify="center" align="center">
            <Icon as={RiLogoutBoxLine} boxSize="60%" />
            <Text fontSize="1.4rem">Sair</Text>
          </Flex>
        </ChakraLink>
      </Flex>
    </Flex>
  );
}
