import { Response } from "express";

import transactionService from "./transaction.service";
import { AuthRequest } from "@/middleware/auth";
import { sendResponse } from "@/shared/utils";

export class TransactionController {
  async myTransactions(req: AuthRequest, res: Response) {
    const transactions = await transactionService.getMyTransactions(
      req.user!.id,
    );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Transactions fetched successfully",
      data: transactions,
    });
  }
  async getAllWithdrawRequests(
  _req: AuthRequest,
  res: Response,
) {
  const data =
    await transactionService.getAllWithdrawRequests();

  return res.status(200).json({
    success: true,
    data,
  });
  }
}

export default new TransactionController();