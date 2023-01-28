import neo4j, { Driver, Session } from "neo4j-driver";

type DriverConfig = {
  uri: string;
  username: string;
  password: string;
};

// To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
export class GraphDb {
  constructor(private readonly driver: Driver) {}

  static async connect({ uri, username, password }: DriverConfig) {
    const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
    await driver.getServerInfo();
    return new GraphDb(driver);
  }

  session = async <T>(callback: (session: Session) => Promise<T>) => {
    const session = this.driver.session();
    try {
      const res = await callback(session);
      return res;
    } finally {
      await session.close();
    }
  };
}
