import { Alert, Button, Input, Space, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCircleX } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";
import { ErrorResponse } from "contracts";
import React from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { addMember } from "../api";
import { Layout } from "../components/Layout";
import { Section } from "../components/Section";

interface Props {}

interface FormValues {
  name: string;
}

export const AddMember: React.FC<Props> = () => {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (value.length >= 2 ? null : "Please enter your name"),
    },
  });

  const mutation = useMutation<{}, ErrorResponse, { name: string }, {}>(
    addMember
  );

  const handleSumbit = (values: FormValues) => {
    mutation.mutateAsync(values).then(() => {
      form.reset();
      navigate("/leaderboard");
    });
  };

  return (
    <Layout>
      <Section title="Add new member">
        <form onSubmit={form.onSubmit(handleSumbit)}>
          <Stack>
            <TextInput
              id="name"
              required
              label="Trainee Name"
              description="Please provide your full name"
              {...form.getInputProps("name")}
            />
            {mutation.isSuccess && (
              <Alert
                icon={<IconCircleX size={18} />}
                title="Success"
                color="green"
              >
                Successfully added as member
              </Alert>
            )}
            {mutation.isError && (
              <Alert icon={<IconCircleX size={18} />} title="Error" color="red">
                {mutation.error.message as string}
              </Alert>
            )}
            <Button
              loading={mutation.isLoading}
              type="submit"
              style={{ alignSelf: "flex-end" }}
              disabled={!form.isTouched}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Section>
    </Layout>
  );
};
