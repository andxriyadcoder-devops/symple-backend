import { User } from "@/modules/user/user.model";
import { Wallet } from "@/modules/wallet/wallet.model";
import { Transaction } from "@/modules/transaction/transaction.model";
import { UserRole, UserStatus } from "@/shared/enums";

export const AdminRepository = {
  getAllUsers: async (query: any) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (query.role) {
      filter.role = query.role;
    }

    if (query.status) {
      filter.status = query.status;
    }

    if (query.search) {
      filter.$or = [
        { fullName: { $regex: query.search, $options: "i" } },
        { username: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
        { phone: { $regex: query.search, $options: "i" } },
      ];
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  getUserById: async (id: string) => {
    return User.findById(id).select("-password");
  },

  updateUserRole: async (id: string, role: string) => {
    return User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
  },

  updateUserStatus: async (id: string, status: string) => {
    return User.findByIdAndUpdate(id, { status }, { new: true }).select("-password");
  },

  getDashboardStats: async () => {
    const [
      totalUsers,
      activeUsers,
      blockedUsers,
      totalAdmins,
      totalWallets,
      totalTransactions,
      walletStats,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: UserStatus.ACTIVE }),
      User.countDocuments({ status: UserStatus.BLOCKED }),
      User.countDocuments({ role: UserRole.ADMIN }),
      Wallet.countDocuments(),
      Transaction.countDocuments(),
      Wallet.aggregate([
        {
          $group: {
            _id: null,
            totalCoinBalance: { $sum: "$coinBalance" },
            totalCashBalance: { $sum: "$cashBalance" },
          },
        },
      ]),
    ]);

    return {
      totalUsers,
      activeUsers,
      blockedUsers,
      totalAdmins,
      totalWallets,
      totalTransactions,
      totalCoinBalance:
        walletStats.length > 0 ? walletStats[0].totalCoinBalance : 0,
      totalCashBalance:
        walletStats.length > 0 ? walletStats[0].totalCashBalance : 0,
    };
  },
};