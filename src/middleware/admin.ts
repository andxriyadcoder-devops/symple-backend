import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { AppError } from '@/shared/errors/AppError';
import { UserRole } from '@/shared/enums';

export const admin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return next(new AppError('Unauthorized', 401));
  }

  if (req.user.role !== UserRole.ADMIN) {
    return next(new AppError('Forbidden', 403));
  }

  next();
};