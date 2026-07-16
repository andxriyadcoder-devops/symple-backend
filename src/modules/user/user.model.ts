import { Schema, model } from 'mongoose';
import { IUserDocument } from './user.types';
import { UserRole, UserStatus } from '@/shared/enums';

const UserSchema = new Schema<IUserDocument>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    avatar: {
      type: String,
      default: '',
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },

    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },

    referralCode: {
      type: String,
      required: true,
      unique: true,
    },

    referredBy: {
      type: String,
      default: null,
    },

    walletId: {
      type: Schema.Types.ObjectId,
      ref: 'Wallet',
      default: null,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<IUserDocument>('User', UserSchema);