import { Types } from 'mongoose';

export interface IWallet {
  walletId: string;

  userId: Types.ObjectId;

  coinBalance: number;

  cashBalance: number;

  pendingBalance: number;

  frozenBalance: number;

  totalEarned: number;

  totalSpent: number;

  totalDeposit: number;

  totalWithdraw: number;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}