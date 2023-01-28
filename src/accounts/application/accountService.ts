// Domain Models
type Account = {
  id: string;
  email: string;
  name: string;
};

// Interfaces
export interface AccountRepository {
  getById: (id: string) => Promise<Account>;
}

export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async getById(id: string) {
    const account = await this.accountRepository.getById(id);
    if (!account) {
      // throw 404
      throw new Error("uh oooh, no account");
    }
    return account;
  }
}
