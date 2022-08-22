import styled from "@emotion/styled";
import { Card, Stack } from "@mantine/core";
import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const CardHeading = styled.h3`
  margin: 0 0;
`;

export const Section: React.FC<Props> = ({ title, children }) => {
  return (
    <Card withBorder>
      <Stack>
        <CardHeading>{title}</CardHeading>
        <div>{children}</div>
      </Stack>
    </Card>
  );
};
