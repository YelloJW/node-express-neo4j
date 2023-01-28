import { Router } from "express";
import { GraphDb } from "../utils/neo4j";
import { routeHandler } from "../utils/middleware/routeHandler";
import { GetUser } from "./application/getUser";
import { PostUser } from "./application/postUser";
import { PostUserFollow } from "./application/postUserFollow";
import { getUser } from "./infrastructure/handlers/getUser";
import { postUser } from "./infrastructure/handlers/postUser";
import { postUserFollow } from "./infrastructure/handlers/postUserFollow";
import { Neo4jUserRepository } from "./infrastructure/repositories/neo4jUserRepository";

type Dependencies = {
  graphDb: GraphDb;
};

export function createRoutes(router: Router, { graphDb }: Dependencies): void {
  const neo4jRepository = new Neo4jUserRepository(graphDb);
  const getUserController = getUser(new GetUser(neo4jRepository));
  const postUserController = postUser(new PostUser(neo4jRepository));
  const postUserFollowController = postUserFollow(
    new PostUserFollow(neo4jRepository)
  );

  router.get("/users/:id([a-z0-9-]{36})", routeHandler(getUserController));
  router.post("/users", routeHandler(postUserController));
  router.post("/users/follow", routeHandler(postUserFollowController));
}
