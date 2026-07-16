import { Schema, model } from 'mongoose';
import { IWalletDocument } from './wallet.types';

const WalletSchema = new Schema<IWalletDocument>(
  {
    walletId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },

    coinBalance: {
      type: Number,
      default: 0,
      min: 0,
    },

    cashBalance: {
      type: Number,
      default: 0,
      min: 0,
    },

    pendingBalance: {
      type: Number,
      default: 0,
      min: 0,
    },

    frozenBalance: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalEarned: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalSpent: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalDeposit: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalWithdraw: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Wallet = model<IWalletDocument>('Wallet', WalletSchema);