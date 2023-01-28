import { Router } from "express";
import { Pool } from "pg";
import { routeHandler } from "../utils/middleware/routeHandler";
import { AccountService } from "./application/accountService";
import { getAccountController } from "./infrastructure/getAccountController";
import { PostgresAccountRepository } from "./infrastructure/postgresAccountRepository";

type Dependencies = {
  postgresConnectionPool: Pool;
};

export const createRoutes = (
  router: Router,
  { postgresConnectionPool }: Dependencies
) => {
  const accountRepository = new PostgresAccountRepository(
    postgresConnectionPool
  );
  const accountService = new AccountService(accountRepository);
  const getAccount = getAccountController(accountService);

  router.get("/account/:id", routeHandler(getAccount));
};
