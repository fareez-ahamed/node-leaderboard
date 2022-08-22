import { Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getLeaderboard } from "../api";
import { Layout } from "../components/Layout";
import { Section } from "../components/Section";

export const Leaderboard = () => {
  const { isLoading, error, data } = useQuery(
    ["leaderboardData"],
    getLeaderboard
  );

  return (
    <Layout>
      <Section title="Leaderboard">
        <Table fontSize={"lg"} verticalSpacing={"md"} highlightOnHover>
          <thead>
            <tr>
              <th style={{ textAlign: "right", maxWidth: "1rem" }}>Rank</th>
              <th style={{ textAlign: "right", maxWidth: "1rem" }}>ID</th>
              <th>Name</th>
              <th style={{ textAlign: "right", maxWidth: "2rem" }}>Points</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row, i) => (
              <tr key={row.name}>
                <td style={{ textAlign: "right", maxWidth: "1rem" }}>
                  {i + 1}
                </td>
                <td style={{ textAlign: "right", maxWidth: "1rem" }}>
                  {row.id}
                </td>
                <td>{row.name}</td>
                <td style={{ textAlign: "right" }}>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
    </Layout>
  );
};
