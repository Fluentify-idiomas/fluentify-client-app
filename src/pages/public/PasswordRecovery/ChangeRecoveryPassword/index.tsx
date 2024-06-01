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
  Spacer
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

type Inputs = {
  password: string;
  passwordConfirm: string;
};

export function ChangeRecoveryPassword() {
  let { email, verifyCode } = useParams();

  const [submitError, setSubmitError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const toggleShowPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

  const { navigateTo } = useAppRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    mode: "all",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsSubmitted(true);

      const payload = {
        user_email: email,
        code_verify: verifyCode,
        recovery_code: data.password,
      }

      const result = await axiosInstance.post("/change_recovery_password", payload);

      if (result) {
        const resultData = await result.data;

        if (!resultData.error) {

          navigateTo('/login');
          setSubmitError(false);
          return;
        }
      }

      setIsSubmitted(false);

      setSubmitError(true);
    } catch (err) {
      setSubmitError(true);
      setIsSubmitted(false);
    }
  };

  const validatePasswordConfirm = (value: string, valueTwo: string) => {
    if (value !== valueTwo) return "As senhas não coincidem";
  };

  return (
    <BoxAuth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Flex direction="column" align="center" justify='center'>
            <Heading
              color="#FC7CFF"
              fontSize="2.5rem"
              fontWeight="bold"
              mb="44px"
            >
              Digite sua nova senha
            </Heading>
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
              _hover={{ bgColor: "#FC7CFF" }}
              mb="30px"
              w="100%"
              type="submit"
              isLoading={isSubmitted}
              loadingText='Enviando'
            >
              Alterar senha
            </Button>
            {submitError && (
              <ErrorMessage mb="10px">Ocorreu algum problema!</ErrorMessage>
            )}
          </Flex>
        </FormControl>
      </form>
    </BoxAuth>
  );
}
