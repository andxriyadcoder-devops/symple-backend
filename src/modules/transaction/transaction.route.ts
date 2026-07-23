import { Router } from "express";

import transactionController from "./transaction.controller";
import { auth } from "@/middleware/auth";
import { UserRole } from "@/shared/enums";
import { asyncHandler } from "@/shared/utils";

const router = Router();

// ===============================
// User Routes
// ===============================

router.get(
  "/me",
  auth(),
  asyncHandler((req, res) =>
    transactionController.myTransactions(req, res)
  )
);

// ===============================
// Super Admin Routes
// ===============================

router.get(
  "/admin/withdraws",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    transactionController.getAllWithdrawRequests(req, res)
  )
);

router.patch(
  "/admin/withdraws/:id/approve",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    transactionController.approveWithdraw(req, res)
  )
);

router.patch(
  "/admin/withdraws/:id/reject",
  auth(UserRole.SUPER_ADMIN),
  asyncHandler((req, res) =>
    transactionController.rejectWithdraw(req, res)
  )
);

export default router;