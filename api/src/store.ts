import { LeaderboardResponse } from "contracts";
import { MongoClient, ObjectId, PipeOptions } from "mongodb";

interface Trainee {
  name: string;
  point_list: { timestamp: string; points: number }[];
}

export class Store {
  client: MongoClient;

  constructor(dbClient: MongoClient) {
    this.client = dbClient;
  }

  private db() {
    return this.client.db("leaderboard");
  }

  private trainees() {
    return this.db().collection<Trainee>("trainees");
  }

  async addTrainee(name: string) {
    this.trainees().insertOne({
      name,
      point_list: [],
    });
  }

  async getTrainees() {
    return this.trainees().find().toArray();
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
    this.trainees().updateOne(
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
}
