import { Pool } from "pg";
import { AccountRepository } from "../application/accountService";

// DB models
type AccountDB = {
  id: string;
  name: string;
  email: string;
};

export class PostgresAccountRepository implements AccountRepository {
  constructor(private readonly connectionPool: Pool) {}

  async getById(id: string) {
    const query = "SELECT * FROM users WHERE id = $1";
    const params = [id];
    const result = await this.connectionPool.query<AccountDB>(query, params);
    return result.rows[0];
  }
}
