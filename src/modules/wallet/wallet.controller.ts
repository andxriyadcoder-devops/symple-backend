import { Response } from "express";

import { WalletService } from "./wallet.service";
import transactionService from "@/modules/transaction/transaction.service";
import { AuthRequest } from "@/middleware/auth";
import { sendResponse } from "@/shared/utils";

const walletService = new WalletService();

export class WalletController {
  async myWallet(req: AuthRequest, res: Response) {
    const wallet = await walletService.getWalletByUserId(req.user!.id);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Wallet fetched successfully",
      data: wallet,
    });
  }

  async claimDailyReward(req: AuthRequest, res: Response) {
  const wallet = await walletService.getWalletByUserId(req.user!.id);

  if (!wallet) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "Wallet not found",
    });
  }

  const amount = await transactionService.claimDailyLogin(
    req.user!.id,
    wallet._id.toString()
  );

  await walletService.addCoin(
    wallet._id.toString(),
    amount
  );

  const updatedWallet = await walletService.getWalletById(
    wallet._id.toString()
  );

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Daily reward claimed successfully",
    data: {
      reward: amount,
      wallet: updatedWallet,
    },
  });
  }

  async sendCoin(req: AuthRequest, res: Response) {
    const result = await walletService.sendCoin(
      req.user!.id,
      req.body.receiverUsername,
      req.body.amount
    );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Coin sent successfully",
      data: result,
    });
  }

  async withdraw(req: AuthRequest, res: Response) {
    const result = await walletService.withdraw(
      req.user!.id,
      req.body.amount
    );

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Withdraw request created",
      data: result,
    });
  }

  // =========================
  // Admin Wallet Management
  // =========================

  async getAllWallets(_req: AuthRequest, res: Response) {
    const wallets = await walletService.getAllWallets();

    return res.status(200).json({
      success: true,
      data: wallets,
    });
  }

  async adminAddCoin(req: AuthRequest, res: Response) {
    const wallet = await walletService.adminAddCoin(
      String(req.params.userId),
      Number(req.body.amount)
    );

    return res.status(200).json({
      success: true,
      message: "Coin added successfully",
      data: wallet,
    });
  }

  async adminDeductCoin(req: AuthRequest, res: Response) {
    const wallet = await walletService.adminDeductCoin(
      String(req.params.userId),
      Number(req.body.amount)
    );

    return res.status(200).json({
      success: true,
      message: "Coin deducted successfully",
      data: wallet,
    });
  }

  async adminAddCash(req: AuthRequest, res: Response) {
    const wallet = await walletService.adminAddCash(
      String(req.params.userId),
      Number(req.body.amount)
    );

    return res.status(200).json({
      success: true,
      message: "Cash added successfully",
      data: wallet,
    });
  }

  async adminDeductCash(req: AuthRequest, res: Response) {
    const wallet = await walletService.adminDeductCash(
      String(req.params.userId),
      Number(req.body.amount)
    );

    return res.status(200).json({
      success: true,
      message: "Cash deducted successfully",
      data: wallet,
    });
  }
}

export default new WalletController();