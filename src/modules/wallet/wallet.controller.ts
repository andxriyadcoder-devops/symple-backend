import { Response } from 'express';

import { WalletService } from './wallet.service';
import transactionService from '@/modules/transaction/transaction.service';
import { AuthRequest } from '@/middleware/auth';

const walletService = new WalletService();

export class WalletController {
  async myWallet(req: AuthRequest, res: Response) {
    const wallet = await walletService.getWalletByUserId(
      req.user!.id,
    );

    return res.status(200).json({
      success: true,
      wallet,
    });
  }

  async claimDailyReward(
    req: AuthRequest,
    res: Response,
    ) 
    {
    const wallet = await walletService.getWalletByUserId(
      req.user!.id,
    );

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: 'Wallet not found',
      });
    }

    const amount =
      await transactionService.claimDailyLogin(
        req.user!.id,
        wallet._id.toString(),
      );

    await walletService.addCoin(
      wallet._id.toString(),
      amount,
    );

    const updatedWallet =
      await walletService.getWalletById(
        wallet._id.toString(),
      );

    return res.status(200).json({
      success: true,
      message: 'Daily reward claimed successfully',
      reward: amount,
      wallet: updatedWallet,
    });
  }
  async sendCoin(req: AuthRequest, res: Response) {
  const result = await walletService.sendCoin(
    req.user!.id,
    req.body.receiverUsername,
    req.body.amount,
  );

  return res.status(200).json({
    success: true,
    message: 'Coin sent successfully',
    data: result,
  });
  }
  async withdraw(
  req: AuthRequest,
  res: Response,
) {
  const result = await walletService.withdraw(
    req.user!.id,
    req.body.amount,
  );

  return res.status(200).json({
    success: true,
    message: 'Withdraw request created',
    data: result,
  });
  }
}

export default new WalletController();