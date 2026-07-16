import { UserRepository } from './user.repository';

export class UserService {
  private repository = new UserRepository();

  async getUserById(id: string) {
    return this.repository.findById(id);
  }

  async getUserByUserId(userId: string) {
    return this.repository.findByUserId(userId);
  }

  async updateUser(id: string, data: any) {
    return this.repository.update(id, data);
  }

  async deleteUser(id: string) {
    return this.repository.delete(id);
  }
}

export default new UserService();