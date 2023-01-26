import express from "express";
import { loadConfig } from "./utils/config";
import { GraphDb } from "./utils/graph";
import { log } from "./utils/log";
import { handleError } from "./utils/middleware/errorHandler";
import { createModule as createUserModule } from "./users/index";

(async function main() {
  const app = express();

  const config = loadConfig();
  const graphDb = await GraphDb.connect({
    uri: config.neo4jUri,
    username: config.neo4jUsername,
    password: config.neo4jPassword,
  });

  app.use(express.json());

  const router = express.Router();

  router.get("/test", (_, res) => res.send("Hello world"));
  createUserModule({ router, graphDb });

  app.use("/v1", router);

  app.use(handleError);

  app.listen(config.port, () =>
    log.info(`server listening on http://localhost:${config.port}`)
  );
})();
