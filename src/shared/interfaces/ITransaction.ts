import { Types } from 'mongoose';
import {
  Currency,
  TransactionStatus,
  TransactionType,
} from '@/shared/enums';

export interface ITransaction {
  transactionId: string;

  walletId: Types.ObjectId;

  userId: Types.ObjectId;

  type: TransactionType;

  status: TransactionStatus;

  currency: Currency;

  amount: number;

  description?: string;

  reference?: string;

  createdBy?: Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;
}