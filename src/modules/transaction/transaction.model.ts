import { Schema, model } from 'mongoose';
import { ITransactionDocument } from './transaction.types';
import {
  TransactionType,
  TransactionStatus,
  Currency,
} from '@/shared/enums';

const TransactionSchema = new Schema<ITransactionDocument>(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    walletId: {
      type: Schema.Types.ObjectId,
      ref: 'Wallet',
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(TransactionStatus),
      default: TransactionStatus.SUCCESS,
    },

    currency: {
      type: String,
      enum: Object.values(Currency),
      default: Currency.COIN,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      default: '',
    },

    reference: {
      type: String,
      default: '',
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

TransactionSchema.index({ userId: 1 });
TransactionSchema.index({ walletId: 1 });
TransactionSchema.index({ type: 1 });
TransactionSchema.index({ createdAt: -1 });

export const Transaction = model<ITransactionDocument>(
  'Transaction',
  TransactionSchema
);