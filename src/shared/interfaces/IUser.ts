import { Types } from 'mongoose';
import { UserRole, UserStatus } from '@/shared/enums';

export interface IUser {
  userId: string;

  fullName: string;

  username: string;

  email?: string;

  phone?: string;

  password: string;

  avatar?: string;

  role: UserRole;

  status: UserStatus;

  referralCode: string;

  referredBy?: string;

  walletId?: Types.ObjectId;

  isEmailVerified: boolean;

  isPhoneVerified: boolean;

  lastLogin?: Date;

  createdAt: Date;

  updatedAt: Date;
}