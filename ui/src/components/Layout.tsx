import { AppShell, Button, Container, Header, Menu } from "@mantine/core";
import React from "react";
import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
}

const InnerHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h2`
  margin: 0 0;
`;

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <Container styles={{ backgroundColor: "transparent" }}>
            <InnerHeader>
              <Heading>Leaderboard</Heading>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button>Fareez Ahamed</Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label onClick={() => alert("Logging out")}>
                    Logout
                  </Menu.Label>
                </Menu.Dropdown>
              </Menu>
            </InnerHeader>
          </Container>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Container>{children}</Container>
    </AppShell>
  );
};
