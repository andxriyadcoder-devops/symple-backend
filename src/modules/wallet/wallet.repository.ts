import { Wallet } from "./wallet.model";
import { IWalletDocument } from "./wallet.types";

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

  async findByUserObjectId(userId: string) {
    return Wallet.findOne({ userId });
  }

  async findByWalletId(walletId: string) {
    return Wallet.findOne({ walletId });
  }

  async getAllWallets() {
    return Wallet.find()
      .populate("userId", "fullName username email role status")
      .sort({ createdAt: -1 });
  }

  async update(id: string, data: Partial<IWalletDocument>) {
    return Wallet.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
  }

  async addCoin(id: string, amount: number) {
    return Wallet.findByIdAndUpdate(
      id,
      {
        $inc: {
          coinBalance: amount,
          totalEarned: amount,
        },
      },
      {
        returnDocument: "after",
      }
    );
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
        returnDocument: "after",
      }
    );
  }

  async addCash(id: string, amount: number) {
    return Wallet.findByIdAndUpdate(
      id,
      {
        $inc: {
          cashBalance: amount,
          totalDeposit: amount,
        },
      },
      {
        returnDocument: "after",
      }
    );
  }

  async removeCash(id: string, amount: number) {
    return Wallet.findByIdAndUpdate(
      id,
      {
        $inc: {
          cashBalance: -amount,
          totalWithdraw: amount,
        },
      },
      {
        returnDocument: "after",
      }
    );
  }
}

export default new WalletRepository();