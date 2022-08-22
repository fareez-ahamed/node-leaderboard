import { AppShell, Container, Header, Navbar } from "@mantine/core";
import React, { PropsWithChildren } from "react";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <h2 style={{ margin: "0 0" }}>Leaderboard</h2>
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
      <Container style={{ backgroundColor: "white" }}>{children}</Container>
    </AppShell>
  );
};
