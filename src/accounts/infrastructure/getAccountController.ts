import { Request, Response } from "express";
import { AccountService } from "../application/accountService";

export const getAccountController =
  (accountService: AccountService) => async (req: Request, _: Response) => {
    const id = req.params.id;
    return accountService.getById(id);
  };
