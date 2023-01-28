import { Pool } from "pg";

type Config = {
  host: string;
  database: string;
  user: string;
  password: string;
  port?: number;
};

export const createConnectionPool = ({
  host,
  database,
  user,
  password,
  port,
}: Config): Pool => {
  return new Pool({ host, database, user, password, port: port ?? 5432 });
};
