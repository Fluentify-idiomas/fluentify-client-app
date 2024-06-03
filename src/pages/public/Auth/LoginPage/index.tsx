import { axiosInstance } from "@/api/axios";
import { BoxAuth } from "@/components/Auth/BoxAuth";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useAuthentication } from "@/services/auth/auth.hook";
import { useAppRouter } from "@/services/router/router.hook";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spacer,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const [submitError, setSubmitError] = useState(false);

  const { navigateTo } = useAppRouter();

  const { handleSignIn } = useAuthentication();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await axiosInstance.post("/login", data);
  
      if (result) {
        const resultData = await result.data;
        if (!resultData.error) {

          const userId = resultData.user_id;
          
          // const userRole: 'member' | 'not member' | 'banned' = resultData.user_role;

          handleSignIn(userId);

          navigateTo('/home');
          setSubmitError(false);
          return;
        }
      }
  
      setSubmitError(true);
    } catch (err) {
      setSubmitError(true);
    }

  };

  return (
    <BoxAuth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Flex direction="column" align="center">
            <Heading
              color="#FC7CFF"
              fontSize="2.5rem"
              fontWeight="bold"
              mb="44px"
            >
              Entre em sua conta
            </Heading>
            <Flex justify="space-between" mb="52px">
              <Flex direction="column" maxWidth="45%">
                <Input
                id="email"
                  size="lg"
                  placeholder="Email"
                  maxWidth="100%"
                  borderRadius="24px"
                  _placeholder={{ color: "#F0F0F0b2" }}
                  borderColor={errors.email ? "red" : "#5A4278"}
                  {...register("email", {
                    required: "O campo de email é obrigatório",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "O campo de email está com formato inválido",
                    },
                  })}
                />
                {errors.email && (
                  <ErrorMessage ml="12px">{errors.email?.message}</ErrorMessage>
                )}
              </Flex>
              <Spacer />
              <Flex direction="column" maxWidth="48%">
                <InputGroup size="lg" w="100%">
                  <Input
                    id="password"
                    size="lg"
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    borderRadius="24px"
                    borderColor={errors.password ? "red" : "#5A4278"}
                    _placeholder={{ color: "#F0F0F0b2" }}
                    {...register("password", {
                      required: "O campo de senha é obrigatório",
                    })}
                  />
                  <InputRightElement width="4.5rem" mr="6px">
                    <Button
                      size="sm"
                      onClick={toggleShowPassword}
                      borderRadius="24px"
                    >
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <ErrorMessage ml="12px">
                    {errors.password?.message}
                  </ErrorMessage>
                )}
              </Flex>
            </Flex>
            <Button
              size="lg"
              bgColor="#8FFF7C"
              color="black"
              fontWeight="bold"
              borderRadius="24px"
              _hover={{ bgColor: "#FC7CFF" }}
              mb="30px"
              w="100%"
              type="submit"
            >
              Entrar
            </Button>
            { submitError && (
              <ErrorMessage mb="10px">
              Email ou senha incorretos!
            </ErrorMessage>
            )}
            <Text alignSelf="flex-start" mb="54px">
              Esqueceu sua senha ?
              <Link href="/password-recovery" color="#E1F030" ml='4px'>
                Recupere aqui
              </Link>
            </Text>
            <Text>
              Não tem conta ?<br />
              <Link href="/register" color="#8B64B0">
                Faça o Cadastro
              </Link>
            </Text>
          </Flex>
        </FormControl>
      </form>
    </BoxAuth>
  );
}
