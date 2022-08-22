import express from "express";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Bismillah-hirrahman-nirraheem",
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
