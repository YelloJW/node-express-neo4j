import express from "express";
import { loadConfig } from "./utils/config";
import { GraphDb } from "./utils/neo4j";
import { createConnectionPool } from "./utils/postgres";
import { log } from "./utils/log";
import { handleError } from "./utils/middleware/errorHandler";
import { createRoutes as createUserRoutes } from "./users";
import { createRoutes as createAccountRoutes } from "./accounts";

(async function main() {
  const app = express();

  const config = loadConfig();

  const graphDb = await GraphDb.connect(config.graphDb);
  const postgresConnectionPool = createConnectionPool(config.postgresDb);

  app.use(express.json());

  const router = express.Router();

  router.get("/test", (_, res) => res.send("Hello world"));
  createUserRoutes(router, { graphDb });
  createAccountRoutes(router, { postgresConnectionPool });

  app.use("/v1", router);

  app.use(handleError);

  app.listen(config.port, () =>
    log.info(`server listening on http://localhost:${config.port}`)
  );
})();
