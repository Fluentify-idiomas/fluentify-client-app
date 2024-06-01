import { axiosInstance } from "@/api/axios";
import { BoxAuth } from "@/components/Auth/BoxAuth";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useAppRouter } from "@/services/router/router.hook";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

type Inputs = {
  user_email: string;
  recovery_code: string;
};

export function VerifyPasswordRecovery() {
  let { email } = useParams();

  const [submitError, setSubmitError] = useState(false);
  const { navigateTo } = useAppRouter();

  const {
    register,
    handleSubmit,
    control,
    getValues,
  } = useForm<Inputs>({
    mode: "all",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await axiosInstance.post(
        "/verify_recovery_password",
        data
      );

      if (result) {
        const resultData = await result.data;

        if (!resultData.error) {

          const user_email = getValues('user_email');
          const verify_code = getValues('recovery_code');

          navigateTo(`/change-password/${user_email}/${verify_code}`);
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
          <Flex direction="column" align="center" justify="center">
            <Heading
              color="#FC7CFF"
              fontSize="2.5rem"
              fontWeight="bold"
              mb="44px"
            >
              Código enviado ao email
            </Heading>
            <Input
              id="email"
              hidden={true}
              value={email}
              {...register("user_email")}
            />
            <Flex direction="column" mb="44px" align="center">
              <Text fontSize="24px" mb="8px">
                Digite o seu código
              </Text>
              <HStack width="100%">
                <Controller
                  name="recovery_code"
                  control={control}
                  render={({ field }) => (
                    <PinInput
                      {...field}
                      type="alphanumeric"
                      placeholder=""
                      size="lg"
                      onChange={(value) => field.onChange(value)}
                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  )}
                />
              </HStack>
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
              Enviar
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
