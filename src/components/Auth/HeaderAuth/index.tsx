import { chakra, Flex } from "@chakra-ui/react";

const HeaderLink = chakra('a', {
  baseStyle: {
    color: '#FC7CFF',
    textDecoration: 'none',
  }
})

function HeaderAuth() {
  return (
    <Flex p='44px' fontSize='1.75rem' fontWeight='bold'>
      <HeaderLink href='/' aria-label="Voltar">Voltar</HeaderLink>
    </Flex>
  );
}

export default HeaderAuth;
