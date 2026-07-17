import { Types } from 'mongoose';

import { WalletRepository } from './wallet.repository';

import { generateWalletId } from '@/shared/utils';

import { AppError } from '@/shared/errors/AppError';
import { UserRepository } from '@/modules/user/user.repository';
import { TransactionService } from '@/modules/transaction/transaction.service';
import { TransactionType } from '@/shared/enums';

export class WalletService {
  private repository = new WalletRepository();
  private userRepository = new UserRepository();
  private transactionService = new TransactionService();

  async createWallet(userId: Types.ObjectId) {
    return this.repository.create({
      walletId: generateWalletId(),

      userId,

      coinBalance: 100,

      cashBalance: 0,

      pendingBalance: 0,

      frozenBalance: 0,

      totalEarned: 100,

      totalSpent: 0,

      totalDeposit: 0,

      totalWithdraw: 0,

      isActive: true,
    });
  }

  async getWalletByUserId(userId: string) {
    return this.repository.findByUserId(userId);
  }

  async getWalletByWalletId(walletId: string) {
    return this.repository.findByWalletId(walletId);
  }

  async updateWallet(id: string, data: any) {
    return this.repository.update(id, data);
  }
  async addCoin(walletId: string, amount: number) {
    console.log("Wallet ID:", walletId);
    console.log("Amount:", amount);
    console.log("Type:", typeof amount);
  return this.repository.addCoin(walletId, amount);
  }
  async getWalletById(id: string) {
  return this.repository.findById(id);
  }
  async getWalletByUserObjectId(userId: string) {
  return this.repository.findByUserObjectId(userId);
  }
  async removeCoin(walletId: string, amount: number) {
  const wallet = await this.getWalletById(walletId);

  if (!wallet) {
    throw new AppError('Wallet not found', 404);
  }

  if (wallet.coinBalance < amount) {
    throw new AppError('Insufficient balance', 400);
  }

  return this.repository.removeCoin(walletId, amount);
  }

  async sendCoin(
  senderUserId: string,
  receiverUsername: string,
  amount: number,
  ) 
  {
  const senderWallet = await this.getWalletByUserId(senderUserId);

  if (!senderWallet) {
    throw new AppError('Sender wallet not found', 404);
  }

  const receiver = await this.userRepository.findByUsername(
    receiverUsername,
  );

  if (!receiver) {
    throw new AppError('Receiver not found', 404);
  }

  const receiverWallet = await this.getWalletByUserObjectId(
    receiver._id.toString(),
  );

  if (!receiverWallet) {
    throw new AppError('Receiver wallet not found', 404);
  }

  await this.removeCoin(senderWallet._id.toString(), amount);

  await this.addCoin(receiverWallet._id.toString(), amount);

  await this.transactionService.createTransfer(
    senderWallet.userId,
    senderWallet._id,
    amount,
    TransactionType.TRANSFER_OUT,
    `Sent to ${receiver.username}`,
  );

  await this.transactionService.createTransfer(
    receiverWallet.userId,
    receiverWallet._id,
    amount,
    TransactionType.TRANSFER_IN,
    `Received from ${receiver.username}`,
  );

  return {
    senderWalletId: senderWallet.walletId,
    receiverWalletId: receiverWallet.walletId,
    amount,
  };
  }
  async withdraw(
  userId: string,
  amount: number,
) {
  const wallet = await this.getWalletByUserId(userId);

  if (!wallet) {
    throw new AppError('Wallet not found', 404);
  }

  if (wallet.coinBalance < amount) {
    throw new AppError('Insufficient balance', 400);
  }

  await this.removeCoin(wallet._id.toString(), amount);

  await this.transactionService.         createWithdrawRequest(
    wallet.userId,
    wallet._id,
    amount,
  );

  return {
    walletId: wallet.walletId,
    amount,
    status: 'PENDING',
  };
  }
    async getAllWallets() {
    return this.repository.getAllWallets();
  }

  async adminAddCoin(userId: string, amount: number) {
    const wallet = await this.getWalletByUserObjectId(userId);

    if (!wallet) {
      throw new AppError("Wallet not found", 404);
    }

    return this.repository.addCoin(wallet._id.toString(), amount);
  }

  async adminDeductCoin(userId: string, amount: number) {
    const wallet = await this.getWalletByUserObjectId(userId);

    if (!wallet) {
      throw new AppError("Wallet not found", 404);
    }

    if (wallet.coinBalance < amount) {
      throw new AppError("Insufficient balance", 400);
    }

    return this.repository.removeCoin(wallet._id.toString(), amount);
  }

  async adminAddCash(userId: string, amount: number) {
    const wallet = await this.getWalletByUserObjectId(userId);

    if (!wallet) {
      throw new AppError("Wallet not found", 404);
    }

    return this.repository.addCash(wallet._id.toString(), amount);
  }

  async adminDeductCash(userId: string, amount: number) {
    const wallet = await this.getWalletByUserObjectId(userId);

    if (!wallet) {
      throw new AppError("Wallet not found", 404);
    }

    if (wallet.cashBalance < amount) {
      throw new AppError("Insufficient cash balance", 400);
    }

    return this.repository.removeCash(wallet._id.toString(), amount);
  }

}

export default new WalletService();