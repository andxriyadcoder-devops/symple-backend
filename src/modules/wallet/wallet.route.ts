import { Router } from "express";

import walletController from "./wallet.controller";
import { auth } from "@/middleware/auth";

const router = Router();

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

export default router;