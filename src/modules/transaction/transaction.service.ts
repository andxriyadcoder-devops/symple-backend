import { Types } from 'mongoose';

import { TransactionRepository } from './transaction.repository';

import { generateTransactionId } from '@/shared/utils/generateTransactionId';
import { AppError } from '@/shared/errors/AppError';
import {
  Currency,
  TransactionStatus,
  TransactionType,
} from '@/shared/enums';

export class TransactionService {
  private repository = new TransactionRepository();

  async createWelcomeBonus(
    userId: Types.ObjectId,
    walletId: Types.ObjectId,
    amount: number,
  ) 
    {
    return this.repository.create({
      transactionId: generateTransactionId(),
      userId,
      walletId,
      amount,
      currency: Currency.COIN,
      type: TransactionType.WELCOME_BONUS,
      status: TransactionStatus.SUCCESS,
      description: 'Welcome Bonus',
    });
  }
  async createReferralReward(
  userId: Types.ObjectId,
  walletId: Types.ObjectId,
  amount: number,
) {
  return this.repository.create({
    transactionId: generateTransactionId(),
    userId,
    walletId,
    amount,
    currency: Currency.COIN,
    type: TransactionType.REFERRAL_REWARD,
    status: TransactionStatus.SUCCESS,
    description: 'Referral Reward',
    reference: 'REFERRAL',
    createdBy: userId,
  });
  }

  async getMyTransactions(userId: string) {
    return this.repository.findByUserId(userId);
  }
  async claimDailyLogin(
  userId: string,
  walletId: string,
) {
  const alreadyClaimed =
    await this.repository.findTodayDailyLogin(userId);

  if (alreadyClaimed) {
    throw new AppError('Daily reward already claimed', 409);
  }

  const amount = 10;

  await this.repository.create({
    transactionId: generateTransactionId(),
    userId: new Types.ObjectId(userId),
    walletId: new Types.ObjectId(walletId),
    amount,
    currency: Currency.COIN,
    type: TransactionType.DAILY_LOGIN,
    status: TransactionStatus.SUCCESS,
    description: 'Daily Login Reward',
    reference: 'DAILY_LOGIN',
    createdBy: new Types.ObjectId(userId),
    });
    return amount;
  }
  async createTransfer(
  userId: Types.ObjectId,
  walletId: Types.ObjectId,
  amount: number,
  type: TransactionType,
  reference: string,
) {
  return this.repository.create({
    transactionId: generateTransactionId(),
    userId,
    walletId,
    amount,
    currency: Currency.COIN,
    type,
    status: TransactionStatus.SUCCESS,
    description: reference,
    reference,
    createdBy: userId,
    });
  }
  async createWithdrawRequest(
  userId: Types.ObjectId,
  walletId: Types.ObjectId,
  amount: number,
) {
  return this.repository.create({
    transactionId: generateTransactionId(),
    userId,
    walletId,
    amount,
    currency: Currency.COIN,
    type: TransactionType.WITHDRAW_REQUEST,
    status: TransactionStatus.PENDING,
    description: 'Withdraw Request',
    reference: 'WITHDRAW_REQUEST',
    createdBy: userId,
  });
  }
}

export default new TransactionService();