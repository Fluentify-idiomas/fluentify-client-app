import { axiosInstance } from "@/api/axios";
import { BoxAuth } from "@/components/Auth/BoxAuth";
import { ErrorMessage } from "@/components/ErrorMessage";
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
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const toggleShowPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

  const [submitError, setSubmitError] = useState(false);

  const { navigateTo } = useAppRouter();

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<Inputs>({
    mode: "all",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { password, passwordConfirm } = data;

      const passwordMatch = password === passwordConfirm;


      if (passwordMatch) {
        const payload = {
          first_name: data.name,
          email: data.email,
          password: data.password,
        }
  
        const result = await axiosInstance.post("/register", payload);
  
        if (result) {
          const resultData = await result.data;
          if (!resultData.error) {
            navigateTo("/login");
            setSubmitError(false);
            return;
          }
        }
      }
      setSubmitError(true);
    } catch (err) {
      setSubmitError(true);
    }
  };

  const validatePasswordConfirm = (value: string, valueTwo: string) => {
    if (value !== valueTwo) return "As senhas não coincidem";
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
              Criar uma nova conta
            </Heading>
            <Flex justify="space-between" mb="16px">
              <Flex direction="column" maxWidth="48%">
                <Input
                  id="name"
                  size="lg"
                  borderRadius="24px"
                  placeholder="Digite seu Nome"
                  _placeholder={{ color: "#F0F0F0b2" }}
                  borderColor={errors.name ? "red" : "#5A4278"}
                  {...register("name", { required: "Nome é obrigatório" })}
                />
                {errors.name && (
                  <ErrorMessage ml="12px">{errors.name?.message}</ErrorMessage>
                )}
              </Flex>
              <Spacer />
              <Flex direction="column" maxWidth="48%">
                <Input
                  id="email"
                  size="lg"
                  placeholder="Digite seu Email"
                  borderRadius="24px"
                  _placeholder={{ color: "#F0F0F0b2" }}
                  borderColor={errors.email ? "red" : "#5A4278"}
                  {...register("email", {
                    required: "Email é obrigatório",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email está com formato inválido",
                    },
                  })}
                />
                {errors.email && (
                  <ErrorMessage ml="12px">{errors.email?.message}</ErrorMessage>
                )}
              </Flex>
            </Flex>
            <Flex justify="space-between" mb="52px">
              <Flex direction="column" maxWidth="48%">
                <InputGroup size="lg">
                  <Input
                    id="password"
                    size="lg"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua Senha"
                    borderRadius="24px"
                    _placeholder={{ color: "#F0F0F0b2" }}
                    borderColor={errors.password ? "red" : "#5A4278"}
                    {...register("password", {
                      required: "Senha é obrigatória",
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
              <Spacer />
              <Flex direction="column" maxWidth="48%">
                <InputGroup size="lg">
                  <Input
                    id="passwordConfirm"
                    size="lg"
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="Confirme sua Senha"
                    borderRadius="24px"
                    _placeholder={{ color: "#F0F0F0b2" }}
                    borderColor={errors.passwordConfirm ? "red" : "#5A4278"}
                    {...register("passwordConfirm", {
                      required: "Confirmação de senha é obrigatória",
                      validate: (value) =>
                        validatePasswordConfirm(value, watch("password")),
                    })}
                  />
                  <InputRightElement width="4.5rem" mr="6px">
                    <Button
                      size="sm"
                      onClick={toggleShowPasswordConfirm}
                      borderRadius="24px"
                    >
                      {showPasswordConfirm ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.passwordConfirm && (
                  <ErrorMessage ml="12px">
                    {errors.passwordConfirm?.message}
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
              type="submit"
              _hover={{ bgColor: "#FC7CFF" }}
              mb="30px"
              w="100%"
            >
              Cadastrar
            </Button>
            { submitError && (
              <ErrorMessage mb="10px">
              Conta já cadastrada!
            </ErrorMessage>
            )}
            <Text>
              Ja tem conta ?<br />
              <Link href="/login" color="#8B64B0">
                Faça o Login
              </Link>
            </Text>
          </Flex>
        </FormControl>
      </form>
    </BoxAuth>
  );
}
