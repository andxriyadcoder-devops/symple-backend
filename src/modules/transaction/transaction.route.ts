import { Router } from 'express';

import transactionController from './transaction.controller';
import { auth } from '@/middleware/auth';

const router = Router();

router.get(
  '/me',
  auth(),
  (req, res) => transactionController.myTransactions(req, res),
);

export default router;