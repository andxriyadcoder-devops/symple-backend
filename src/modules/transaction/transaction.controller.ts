import { Response } from 'express';

import transactionService from './transaction.service';
import { AuthRequest } from '@/middleware/auth';

export class TransactionController {
  async myTransactions(req: AuthRequest, res: Response) {
    const transactions =
      await transactionService.getMyTransactions(
        req.user!.id,
      );

    return res.status(200).json({
      success: true,
      transactions,
    });
  }
}

export default new TransactionController();