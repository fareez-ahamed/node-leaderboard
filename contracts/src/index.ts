export type LeaderboardResponse = {
  id: string;
  name: string;
  points: number;
}[];

export type LoginResponse = {
  token: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type ErrorResponse = {
  message: string;
};

export type TokenContents = {
  username: string;
  name: string;
};
