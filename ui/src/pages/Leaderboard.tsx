import styled from "@emotion/styled";
import {
  Button,
  Grid,
  Modal,
  Popover,
  SimpleGrid,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { IconMenu2 } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getLeaderboard } from "../api";
import { Layout } from "../components/Layout";
import { Section } from "../components/Section";

const NumericHeader = styled.th`
  text-align: right !important;
  max-width: 1rem;
`;

const NumericCell = styled.td`
  text-align: right;
  max-width: 1rem;
`;

const ActionHeader = styled.th`
  max-width: 1rem;
`;

const ActionCell = styled.td`
  max-width: 1rem;
`;

export const Leaderboard = () => {
  const { isLoading, error, data } = useQuery(
    ["leaderboardData"],
    getLeaderboard
  );

  const [opened, setOpened] = useState(false);

  const openPointsDialog = () => {
    setOpened(true);
  };

  return (
    <>
      <Layout>
        <Section title="Leaderboard">
          <Table fontSize={"lg"} verticalSpacing={"md"} highlightOnHover>
            <thead>
              <tr>
                <NumericHeader>Rank</NumericHeader>
                <NumericHeader>ID</NumericHeader>
                <th>Name</th>
                <NumericHeader>Points</NumericHeader>
                <ActionHeader>Actions</ActionHeader>
              </tr>
            </thead>
            <tbody>
              {data?.map((row, i) => (
                <tr key={row.name}>
                  <NumericCell>{i + 1}</NumericCell>
                  <NumericCell>{row.id}</NumericCell>
                  <td>{row.name}</td>
                  <NumericCell>{row.points}</NumericCell>
                  <ActionCell>
                    <Button size="xs" onClick={() => openPointsDialog()}>
                      <IconMenu2 />
                    </Button>
                  </ActionCell>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
      </Layout>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Reward Points"
      >
        <Stack>
          <SimpleGrid cols={5}>
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button>5</Button>
            <Button>10</Button>
            <Button color="red">-1</Button>
            <Button color="red">-2</Button>
            <Button color="red">-3</Button>
            <Button color="red">-5</Button>
            <Button color="red">-10</Button>
          </SimpleGrid>
        </Stack>
      </Modal>
    </>
  );
};
