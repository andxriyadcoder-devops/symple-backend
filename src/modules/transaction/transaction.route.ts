import { Router } from 'express';

import transactionController from './transaction.controller';
import { auth } from '@/middleware/auth';
import { UserRole } from "@/shared/enums";

const router = Router();

router.get(
  '/me',
  auth(),
  (req, res) => transactionController.myTransactions(req, res),
);
router.get(
  "/admin/withdraws",
  auth(UserRole.SUPER_ADMIN),
  (req, res) =>
    transactionController.getAllWithdrawRequests(req, res),
);

export default router;