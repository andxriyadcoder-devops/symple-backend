import { Router } from 'express';

import authRoutes from '@/modules/auth/auth.route';
import walletRoutes from '@/modules/wallet/wallet.route';
import transactionRoutes from '@/modules/transaction/transaction.route';
import adminRoutes from '@/modules/admin/admin.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/transactions', transactionRoutes);
router.use('/wallet', walletRoutes);
router.use('/admin', adminRoutes);

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Symple API v1',
  });
});

export default router;