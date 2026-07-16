import { User } from './user.model';
import { IUserDocument } from './user.types';

export class UserRepository {
  async create(data: Partial<IUserDocument>) {
    return User.create(data);
  }

  async findById(id: string) {
    return User.findById(id);
  }

  async findByUserId(userId: string) {
    return User.findOne({ userId });
  }

  async findByEmail(email: string) {
    return User.findOne({ email }).select('+password');
  }

  async findByUsername(username: string) {
    return User.findOne({ username }).select('+password');
  }

  async findByPhone(phone: string) {
    return User.findOne({ phone }).select('+password');
  }

  async update(id: string, data: Partial<IUserDocument>) {
    return User.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    });
  }

  async delete(id: string) {
    return User.findByIdAndDelete(id);
  }
}