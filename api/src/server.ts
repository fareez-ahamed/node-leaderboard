import express from "express";
import { MongoClient } from "mongodb";
import { Store } from "./services/store";
import { router } from "./routes";
import morgan from "morgan";
import { errorHandler } from "./middlewares";
import { ConfigService } from "./services/configuration";

declare global {
  namespace Express {
    interface Request {
      store: Store;
    }
  }
}

// const app = express();
const PORT = process.env.PORT ?? 4000;

async function createApplication() {
  const configService = new ConfigService();

  // Create mongo client
  const mongoClient = new MongoClient(configService.getMongoURI());
  console.log(`Connecting to database ${configService.getMongoURI()}`);
  await mongoClient.connect();
  console.log(`Connected successfully to database`);

  // Initialize Services
  const store = new Store(mongoClient, configService);

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
  app.use("/api", router);
  app.use(errorHandler);

  return app;
}

createApplication().then((app) => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
