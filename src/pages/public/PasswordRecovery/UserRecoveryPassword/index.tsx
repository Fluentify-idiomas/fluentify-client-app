import { axiosInstance } from "@/api/axios";
import { BoxAuth } from "@/components/Auth/BoxAuth";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useAppRouter } from "@/services/router/router.hook";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  user_email: string;
};

export function UserRecoveryPassword() {
  const [submitError, setSubmitError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { navigateTo } = useAppRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsSubmitted(true);
      const result = await axiosInstance.post("/recovery_password", data);

      if (result) {
        const resultData = await result.data;

        if (!resultData.error) {
          const email = getValues('user_email');

          navigateTo(`/verify-password-recovery/${email}`);
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
              Recuperação de senha
            </Heading>
            <Flex mb="52px" direction='column' align='flex-start' width='100%'>
              <Input
                id="email"
                size="lg"
                placeholder="Email"
                borderRadius="24px"
                _placeholder={{ color: "#F0F0F0b2" }}
                borderColor={errors.user_email ? "red" : "#5A4278"}
                {...register("user_email", {
                  required: "O campo de email é obrigatório",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "O campo de email está com formato inválido",
                  },
                })}
              />
              {errors.user_email && (
                <ErrorMessage ml="12px">{errors.user_email?.message}</ErrorMessage>
              )}
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
              Envie o código para seu email
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
