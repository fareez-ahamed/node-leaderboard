import styled from "@emotion/styled";
import { Alert, Button, Container, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCircleX } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api";
import { Section } from "../components/Section";

interface FormValues {
  username: string;
  password: string;
}

const ScreenCenter = styled.div`
  background-color: #fafafa;
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const LoginPage = () => {
  const form = useForm<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value.length >= 2 ? null : "Please enter your username",
      password: (value) =>
        value.length >= 2 ? null : "Please enter your password",
    },
  });

  const mutation = useMutation(login);

  const handleSumbit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <ScreenCenter>
      <Container size={"lg"}>
        <Section title="Login">
          <form onSubmit={form.onSubmit(handleSumbit)}>
            <Stack style={{ width: "20rem" }}>
              <TextInput
                id="username"
                required
                label="Username"
                {...form.getInputProps("username")}
              />
              <TextInput
                id="password"
                required
                label="Password"
                type="password"
                {...form.getInputProps("password")}
              />
              {mutation.isError && (
                <Alert
                  icon={<IconCircleX size={18} />}
                  title="Error"
                  color="red"
                >
                  {mutation.error as string}
                </Alert>
              )}
              <Button
                loading={mutation.isLoading}
                type="submit"
                style={{ alignSelf: "flex-end" }}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Section>
      </Container>
    </ScreenCenter>
  );
};
