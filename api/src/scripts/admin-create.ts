import { MongoClient } from "mongodb";
import { ConfigService } from "../services/configuration";
import { Store } from "../services/store";
import readline from "readline/promises";

interface Input {
  username: string;
  password: string;
  name: string;
}

async function prepareEnv() {
  const configService = new ConfigService();
  const mongoClient = new MongoClient(configService.getMongoURI());
  await mongoClient.connect();
  const store = new Store(mongoClient, configService);
  return store;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function inputData(): Promise<Input> {
  return {
    username: await rl.question("Username"),
    password: await rl.question("Password"),
    name: await rl.question("name"),
  };
}

async function main() {
  const data = await inputData();
  const store = await prepareEnv();
  await store.createUser(data.username, data.name, data.password);
}

main()
  .then(() => {
    console.log("Successfully created");
  })
  .catch((error: Error) => {
    console.log(error);
  });
