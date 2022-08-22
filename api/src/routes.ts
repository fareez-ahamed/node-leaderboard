import { LeaderboardResponse } from "contracts";
import { Router, Response, Request } from "express";

export const router = Router();

router.get("/api/", (req, res) => {
  res.status(200).send({
    message: "Bismillah-hirrahman-nirraheem",
  });
});

router.get("/api/leaderboard", (req, res: Response<LeaderboardResponse>) => {
  req.store.getLeaderboard().then((data) => res.status(200).send(data));
});

router.post("/api/members", (req: Request<{}, {}, { name: string }>, res) => {
  req.store.addTrainee(req.body.name).then(() => {
    res.status(201).send();
  });
});
