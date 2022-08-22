import { InvalidConfigurationError } from "../errors";

export class ConfigService {
  constructor() {}

  getMongoURI() {
    return process.env.DB_URI ?? "mongodb://localhost:27017/leaderboard";
  }

  getJwtSecret(): string | never {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new InvalidConfigurationError();
    }
    return secret;
  }
}
