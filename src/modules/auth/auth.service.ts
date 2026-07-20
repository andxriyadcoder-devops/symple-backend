import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";

import { AuthRepository } from "./auth.repository";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

import { WalletService } from "@/modules/wallet/wallet.service";
import { TransactionService } from "@/modules/transaction/transaction.service";

import { env } from "@/config/env";
import { generateUserId } from "@/shared/utils";
import { AppError } from "@/shared/errors/AppError";

export class AuthService {
  private repository = new AuthRepository();

  private walletService = new WalletService();

  private transactionService = new TransactionService();

  async register(data: RegisterDto) {
    // Check email
    if (data.email) {
      const emailExists = await this.repository.findByEmail(data.email);

      if (emailExists) {
        throw new AppError("Email already exists", 409);
      }
    }

    // Check username
    const usernameExists = await this.repository.findByUsername(
      data.username
    );

    if (usernameExists) {
      throw new AppError("Username already exists", 409);
    }

    // Check phone
    if (data.phone) {
      const phoneExists = await this.repository.findByPhone(data.phone);

      if (phoneExists) {
        throw new AppError("Phone already exists", 409);
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await this.repository.create({
      ...data,
      password: hashedPassword,
      userId: generateUserId(),
      referralCode: generateUserId().replace("USR_", "REF_"),
    });

    // Create wallet
    const wallet = await this.walletService.createWallet(
      user._id as Types.ObjectId
    );

    // Save wallet id
    await this.repository.update(user._id.toString(), {
      walletId: wallet._id,
    });

    // Welcome bonus
    await this.walletService.addCoin(
      wallet._id.toString(),
      100
    );

    await this.transactionService.createWelcomeBonus(
      user._id as Types.ObjectId,
      wallet._id as Types.ObjectId,
      100
    );

    // Referral reward
    if (data.referralCode) {
      const referrer =
        await this.repository.findByReferralCode(
          data.referralCode
        );

      if (referrer) {
        const referrerWallet =
          await this.walletService.getWalletByUserObjectId(
            referrer._id.toString()
          );

        if (referrerWallet) {
          // Referrer +50
          await this.walletService.addCoin(
            referrerWallet._id.toString(),
            50
          );

          await this.transactionService.createReferralReward(
            referrer._id,
            referrerWallet._id,
            50
          );

          // New user +25
          await this.walletService.addCoin(
            wallet._id.toString(),
            25
          );

          await this.transactionService.createReferralReward(
            user._id,
            wallet._id,
            25
          );

          await this.repository.update(
            user._id.toString(),
            {
              referredBy: referrer.referralCode,
            }
          );
        }
      }
    }

    // Get updated user
    const updatedUser =
      await this.repository.findByEmailOrUsername(
        user.username
      );

    if (!updatedUser) {
      throw new AppError("User not found", 404);
    }

    // JWT
    const secret: Secret = env.JWT_SECRET;

    const options: SignOptions = {
      expiresIn: "7d",
    };

    const token = jwt.sign(
      {
        id: updatedUser._id,
        role: updatedUser.role,
      },
      secret,
      options
    );

    const userObject = updatedUser.toObject();

    const { password, ...safeUser } = userObject;

    return {
      success: true,
      message: "User registered successfully",
      token,
      user: safeUser,
    };
  }

  async login(data: LoginDto) {
    const user =
      await this.repository.findByEmailOrUsername(
        data.emailOrUsername
      );

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordMatched = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordMatched) {
      throw new AppError("Invalid credentials", 401);
    }

    const secret: Secret = env.JWT_SECRET;

    const options: SignOptions = {
      expiresIn: "7d",
    };

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      secret,
      options
    );

    const userObject = user.toObject();

    const { password, ...safeUser } = userObject;

    return {
      success: true,
      message: "Login successful",
      token,
      user: safeUser,
    };
  }
  async me(id: string) {
  const user = await this.repository.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
  }
}

export default new AuthService();