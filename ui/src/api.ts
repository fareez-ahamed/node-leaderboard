import axios from "axios";
import { LeaderboardResponse, LoginPayload, LoginResponse } from "contracts";

export const getLeaderboard: () => Promise<LeaderboardResponse> = () => {
  return axios.get("/api/leaderboard").then((resp) => resp.data);
};

export const addMember: (data: { name: string }) => Promise<{}> = (data) => {
  return axios.post("/api/members", data);
};

export const login: (
  data: LoginPayload
) => Promise<LoginResponse> = (credentials: {
  username: string;
  password: string;
}) => {
  return axios.post("/api/login", credentials).then((resp) => resp.data);
};

export const addPoints = (data: {
  traineeId: string;
  points: number;
  token: string;
}) => {
  return axios.post(
    `/api/members/${data.traineeId}/points`,
    {
      points: data.points,
    },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
};
