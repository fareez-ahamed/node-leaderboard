import { LeaderboardResponse } from "contracts";
import { MongoClient, ObjectId, PipeOptions } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { InvalidConfigurationError, InvalidCredentialsError } from "../errors";
import { ConfigService } from "./configuration";

interface Trainee {
  name: string;
  point_list: { timestamp: string; points: number }[];
}

interface User {
  name: string;
  username: string;
  passwordHash: string;
}

export class Store {
  client: MongoClient;
  config: ConfigService;

  constructor(dbClient: MongoClient, configService: ConfigService) {
    this.client = dbClient;
    this.config = configService;
  }

  private db() {
    return this.client.db("leaderboard");
  }

  private trainees() {
    return this.db().collection<Trainee>("trainees");
  }

  private users() {
    return this.db().collection<User>("users");
  }

  async addTrainee(name: string) {
    await this.trainees().insertOne({
      name,
      point_list: [],
    });
  }

  async getTrainees() {
    return await this.trainees().find().toArray();
  }

  async getLeaderboard(): Promise<LeaderboardResponse> {
    return (await this.getTrainees())
      .map((d) => ({
        id: d._id.toString(),
        name: d.name,
        points: d.point_list.reduce(
          (carry, pointRow) => carry + pointRow.points,
          0
        ),
      }))
      .sort((a, b) => b.points - a.points);
  }

  async addPoints(memberId: string, points: number) {
    await this.trainees().updateOne(
      {
        _id: new ObjectId(memberId),
      },
      {
        $push: {
          point_list: {
            timestamp: new Date().toISOString(),
            points: points,
          },
        },
      }
    );
  }

  async createUser(username: string, name: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    await this.users().insertOne({
      username,
      name,
      passwordHash: hash,
    });
  }

  async generateLoginToken(
    username: string,
    password: string
  ): Promise<string> {
    const user = await this.users().findOne({ username });
    if (user === null) {
      throw new InvalidCredentialsError();
    }
    if ((await bcrypt.compare(password, user?.passwordHash)) !== true) {
      throw new InvalidCredentialsError();
    }
    return jwt.sign({ username, name: user.name }, this.config.getJwtSecret());
  }

  async validateToken(token: string) {
    const _ = jwt.verify(token, this.config.getJwtSecret());
  }
}
