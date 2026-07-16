import { Wallet } from './wallet.model';
import { IWalletDocument } from './wallet.types';

export class WalletRepository {
  async create(data: Partial<IWalletDocument>) {
    return Wallet.create(data);
  }
  async findById(id: string) {
  return Wallet.findById(id);
  }

  async findByUserId(userId: string) {
    return Wallet.findOne({ userId });
  }

  async findByWalletId(walletId: string) {
    return Wallet.findOne({ walletId });
  }

  async update(id: string, data: Partial<IWalletDocument>) {
    return Wallet.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
    });
  }
  
  async findByUserObjectId(userId: string) {
  return Wallet.findOne({
    userId,
    });
  }
  async removeCoin(id: string, amount: number) {
  return Wallet.findByIdAndUpdate(
    id,
    {
      $inc: {
        coinBalance: -amount,
        totalSpent: amount,
      },
    },
    {
      returnDocument: 'after',
    },
    );
  }
  async addCoin(walletId: string, amount: number) {
  return Wallet.findByIdAndUpdate(
    walletId,
    {
      $inc: {
        coinBalance: amount,
        totalEarned: amount,
      },
    },
    {
      returnDocument: 'after',
    },
  );
  }

}

export default new WalletRepository();