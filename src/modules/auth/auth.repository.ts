import { User } from '@/modules/user/user.model';
import { RegisterDto } from './dto/register.dto';

export class AuthRepository {
  async findByEmail(email: string) {
    return User.findOne({ email });
  }

  async findByUsername(username: string) {
    return User.findOne({ username });
  }

  async findByPhone(phone: string) {
    return User.findOne({ phone });
  }

  async findByEmailOrUsername(emailOrUsername: string) {
    return User.findOne({
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername },
      ],
    }).select('+password');
  }

  async create(data: RegisterDto & Record<string, any>) {
    return User.create(data);
  }

  async update(id: string, data: Record<string, any>) {
    return User.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    });
  }
  async findByReferralCode(referralCode: string) {
  return User.findOne({
    referralCode,
  });
}
}

export default new AuthRepository();