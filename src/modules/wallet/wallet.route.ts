import { Router } from "express";

import walletController from "./wallet.controller";
import { auth } from "@/middleware/auth";
import { UserRole } from "@/shared/enums";

const router = Router();

// ======================
// User Routes
// ======================

router.get(
  "/me",
  auth(),
  (req, res) => walletController.myWallet(req, res),
);

router.post(
  "/daily-login",
  auth(),
  (req, res) => walletController.claimDailyReward(req, res),
);

router.post(
  "/send",
  auth(),
  (req, res) => walletController.sendCoin(req, res),
);

router.post(
  "/withdraw",
  auth(),
  (req, res) => walletController.withdraw(req, res),
);

// ======================
// Admin Wallet Routes
// ======================

router.get(
  "/admin/all",
  auth(UserRole.SUPER_ADMIN),
  (req, res) => walletController.getAllWallets(req, res),
);

router.patch(
  "/admin/:userId/add-coin",
  auth(UserRole.SUPER_ADMIN),
  (req, res) => walletController.adminAddCoin(req, res),
);

router.patch(
  "/admin/:userId/deduct-coin",
  auth(UserRole.SUPER_ADMIN),
  (req, res) => walletController.adminDeductCoin(req, res),
);

router.patch(
  "/admin/:userId/add-cash",
  auth(UserRole.SUPER_ADMIN),
  (req, res) => walletController.adminAddCash(req, res),
);

router.patch(
  "/admin/:userId/deduct-cash",
  auth(UserRole.SUPER_ADMIN),
  (req, res) => walletController.adminDeductCash(req, res),
);

export default router;