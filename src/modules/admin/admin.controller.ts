import { Request, Response } from "express";
import { AdminService } from "./admin.service";

export const AdminController = {
  getDashboard: async (_req: Request, res: Response) => {
    const stats = await AdminService.getDashboardStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  },

  getAllUsers: async (_req: Request, res: Response) => {
    const users = await AdminService.getAllUsers(_req.query);

    res.status(200).json({
      success: true,
      data: users,
    });
  },

  getUserById: async (req: Request, res: Response) => {
    const id = String(req.params.id);

    const user = await AdminService.getUserById(id);

    res.status(200).json({
      success: true,
      data: user,
    });
  },

  updateRole: async (req: Request, res: Response) => {
    const id = String(req.params.id);

    const user = await AdminService.updateUserRole(
      id,
      req.body.role
    );

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: user,
    });
  },

  updateStatus: async (req: Request, res: Response) => {
    const id = String(req.params.id);

    const user = await AdminService.updateUserStatus(
      id,
      req.body.status
    );

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: user,
    });
  },
};