import { LeaderboardResponse } from "contracts";
import { Router, Response, Request } from "express";
import { authMiddleware } from "./middlewares";

export const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({
    message: "Bismillah-hirrahman-nirraheem",
  });
});

router.post(
  "/login",
  (req: Request<{}, {}, { username: string; password: string }>, res, next) => {
    req.store
      .generateLoginToken(req.body.username, req.body.password)
      .then((token) => res.status(200).send({ token }))
      .catch(next);
  }
);

router.get("/leaderboard", (req, res: Response<LeaderboardResponse>, next) => {
  req.store
    .getLeaderboard()
    .then((data) => res.status(200).send(data))
    .catch(next);
});

router.post("/members", (req: Request<{}, {}, { name: string }>, res, next) => {
  req.store
    .addTrainee(req.body.name)
    .then(() => {
      res.status(201).send();
    })
    .catch(next);
});

router.post(
  "/members/:id/points",
  authMiddleware,
  (req: Request<{ id: string }, {}, { points: number }>, res, next) => {
    req.store
      .addPoints(req.params.id, req.body.points)
      .then(() => {
        res.status(201).send();
      })
      .catch(next);
  }
);
