import { config } from "dotenv";

config();

export interface Config {
  port: number;
  graphDb: {
    uri: string;
    username: string;
    password: string;
    instanceName: string;
  };
  postgresDb: {
    host: string;
    database: string;
    user: string;
    password: string;
    port: number;
  };
}

export const loadConfig = (): Config => {
  const port = parseInt(process.env.PORT as string, 10) || 8000;

  const neo4jUri = process.env.NEO4J_URI as string;
  const neo4jUsername = process.env.NEO4J_USERNAME as string;
  const neo4jPassword = process.env.NEO4J_PASSWORD as string;
  const neo4jInstanceName = process.env.NEO4J_INSTANCE_NAME as string;

  const postgresHost = process.env.POSTGRES_HOST as string;
  const postgresDb = process.env.POSTGRES_DATABASE as string;
  const postgresUser = process.env.POSTGRES_USER as string;
  const postgresPassword = process.env.POSTGRES_PASSWORD as string;
  const postgresPort =
    parseInt(process.env.POSTGRES_PORT as string, 10) || 5432;

  return {
    port,
    graphDb: {
      uri: neo4jUri,
      username: neo4jUsername,
      password: neo4jPassword,
      instanceName: neo4jInstanceName,
    },
    postgresDb: {
      host: postgresHost,
      port: postgresPort,
      database: postgresDb,
      user: postgresUser,
      password: postgresPassword,
    },
  };
};
