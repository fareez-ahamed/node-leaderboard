// export const getLeaderboard: () => Promise<
//   { id: number; name: string; points: number }[]
// > = () => {
//   return new Promise((resolve, reject) =>
//     setTimeout(
//       () =>
//         resolve([
//           { id: 32, name: "Fareez Ahamed", points: 348 },
//           { id: 32, name: "Fareez Ahamed", points: 348 },
//           { id: 32, name: "Fareez Ahamed", points: 348 },
//           { id: 32, name: "Fareez Ahamed", points: 348 },
//           { id: 34, name: "Fareez Ahamed", points: 348 },
//           { id: 34, name: "Fareez Ahamed", points: 348 },
//           { id: 32, name: "Fareez Ahamed", points: 348 },
//           { id: 32, name: "Fareez Ahamed", points: 348 },
//           { id: 32, name: "Fareez Ahamed", points: 348 },
//           { id: 32, name: "Fareez Ahamed", points: 348 },
//           { id: 32, name: "Fareez Ahamed", points: 348 },
//           { id: 32, name: "Fareez Ahamed", points: 348 },
//         ]),
//       1000
//     )
//   );
// };

import axios from "axios";
import { LeaderboardResponse } from "contracts";

export const getLeaderboard: () => Promise<LeaderboardResponse> = () => {
  return axios.get("/api/leaderboard").then((resp) => resp.data);
};

export const addMember: (data: { name: string }) => Promise<{}> = (data) => {
  return axios.post("/api/members", data);
};

export const login = (data: { username: string; password: string }) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject("Invalid Credentials"), 1000)
  );
};

export const addPoints = (data: { traineeId: string; points: number }) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(null), 1000)
  );
};
