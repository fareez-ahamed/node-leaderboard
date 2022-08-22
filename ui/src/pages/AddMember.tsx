import { Button, Input, Space, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { addMember } from "../api";
import { Layout } from "../components/Layout";
import { Section } from "../components/Section";

interface Props {}

interface FormValues {
  name: string;
}

export const AddMember: React.FC<Props> = () => {
  const form = useForm<FormValues>({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (value.length >= 2 ? null : "Please enter your name"),
    },
  });

  const mutation = useMutation(addMember);

  const handleSumbit = (values: FormValues) => {
    mutation.mutate(values);
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
