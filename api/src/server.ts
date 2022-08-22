import express from "express";
import { MongoClient } from "mongodb";
import { Store } from "./store";
import { router } from "./routes";
import morgan from "morgan";

declare global {
  namespace Express {
    interface Request {
      store: Store;
    }
  }
}

// const app = express();
const PORT = process.env.PORT ?? 4000;
const URI = process.env.DB_URI ?? "mongodb://localhost:27017/leaderboard";

async function createApplication(dbUri: string) {
  // Create mongo client
  const mongoClient = new MongoClient(dbUri);
  console.log(`Connecting to database ${dbUri}`);
  await mongoClient.connect();
  console.log(`Connected successfully to database`);

  // Initialize Services
  const store = new Store(mongoClient);

  // Create a new app
  const app = express();

  // Configure app
  app.use((req, res, next) => {
    req.store = store;
    next();
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan("tiny"));

  return app;
}

createApplication(URI).then((app) => {
  app.use("/", router);
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
