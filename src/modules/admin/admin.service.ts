import { AdminRepository } from "./admin.repository";

export const AdminService = {
  getAllUsers: async (query: any) => {
    return AdminRepository.getAllUsers(query);
  },

  getUserById: async (id: string) => {
    return AdminRepository.getUserById(id);
  },

  updateUserRole: async (id: string, role: string) => {
    return AdminRepository.updateUserRole(id, role);
  },

  updateUserStatus: async (id: string, status: string) => {
    return AdminRepository.updateUserStatus(id, status);
  },

  getDashboardStats: async () => {
    return AdminRepository.getDashboardStats();
  },
};