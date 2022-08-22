import styled from "@emotion/styled";
import {
  Alert,
  Button,
  LoadingOverlay,
  Modal,
  SimpleGrid,
  Stack,
  Table,
} from "@mantine/core";
import { IconCircleX, IconMenu2 } from "@tabler/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { addPoints, getLeaderboard } from "../api";
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

const POINTS = [1, 2, 3, 5, 10, -1, -2, -3, -5, -10];

export const Leaderboard = () => {
  const [selectedTraineeId, setSelectedTraineeId] = useState<number>();
  const [rewardedPoints, setRewardedPoints] = useState<number>();
  const [opened, setOpened] = useState(false);

  const query = useQuery(["leaderboardData"], getLeaderboard);

  const addPointsMutation = useMutation(addPoints);

  const traineeName = useMemo<string>(
    () =>
      query.data?.find((x) => x.id === selectedTraineeId)?.name ?? "No Name",
    [query.data, selectedTraineeId]
  );

  const openPointsDialog = (traineeId: number) => {
    setSelectedTraineeId(traineeId);
    setOpened(true);
  };

  const handleCloseDialog = () => {
    setSelectedTraineeId(undefined);
    setOpened(false);
  };

  const handleAddPoints = (traineeId: number, points: number) => {
    setRewardedPoints(points);
    addPointsMutation.mutateAsync({ traineeId, points }).then(() => {
      handleCloseDialog();
      setRewardedPoints(undefined);
      query.refetch();
    });
  };

  const isRewardingPoints = (points: number) =>
    rewardedPoints === points && addPointsMutation.isLoading;

  return (
    <>
      <Layout>
        <Section title="Leaderboard">
          {query.isFetched && (
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
                {query.data?.map((row, i) => (
                  <tr key={row.name}>
                    <NumericCell>{i + 1}</NumericCell>
                    <NumericCell>{row.id}</NumericCell>
                    <td>{row.name}</td>
                    <NumericCell>{row.points}</NumericCell>
                    <ActionCell>
                      <Button
                        size="xs"
                        onClick={() => openPointsDialog(row.id)}
                      >
                        <IconMenu2 />
                      </Button>
                    </ActionCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {query.isLoading && <LoadingOverlay visible={query.isLoading} />}
          {query.isError && (
            <Alert icon={<IconCircleX size={18} />} title="Error" color="red">
              {addPointsMutation.error as string}
            </Alert>
          )}
        </Section>
      </Layout>
      <Modal
        opened={opened}
        onClose={handleCloseDialog}
        title={`Reward Points to ${traineeName}`}
      >
        <Stack>
          <SimpleGrid cols={5}>
            {POINTS.map((point) => (
              <Button
                color={point > 0 ? "blue" : "red"}
                loading={isRewardingPoints(point)}
                onClick={() =>
                  selectedTraineeId && handleAddPoints(selectedTraineeId, point)
                }
              >
                {point}
              </Button>
            ))}
          </SimpleGrid>
          {addPointsMutation.isError && (
            <Alert icon={<IconCircleX size={18} />} title="Error" color="red">
              {addPointsMutation.error as string}
            </Alert>
          )}
        </Stack>
      </Modal>
    </>
  );
};
