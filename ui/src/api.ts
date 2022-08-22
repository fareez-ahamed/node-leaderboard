export const getLeaderboard = () => {
  return Promise.resolve([
    { id: 32, name: "Fareez Ahamed", points: 348 },
    { id: 32, name: "Fareez Ahamed", points: 348 },
    { id: 32, name: "Fareez Ahamed", points: 348 },
    { id: 32, name: "Fareez Ahamed", points: 348 },
    { id: 34, name: "Fareez Ahamed", points: 348 },
    { id: 34, name: "Fareez Ahamed", points: 348 },
    { id: 32, name: "Fareez Ahamed", points: 348 },
    { id: 32, name: "Fareez Ahamed", points: 348 },
    { id: 32, name: "Fareez Ahamed", points: 348 },
    { id: 32, name: "Fareez Ahamed", points: 348 },
    { id: 32, name: "Fareez Ahamed", points: 348 },
    { id: 32, name: "Fareez Ahamed", points: 348 },
  ]);
};

export const addMember = (data: { name: string }) => {
  return new Promise((resolve, reject) => setTimeout(resolve, 1000));
};

export const login = (data: { username: string; password: string }) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject("Invalid Credentials"), 1000)
  );
};
