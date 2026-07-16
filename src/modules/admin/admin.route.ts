import { Router } from "express";
import { AdminController } from "./admin.controller";
import { auth } from "@/middleware/auth";
import { UserRole } from "@/shared/enums";

const router = Router();

// Only Super Admin can access all admin routes
router.use(auth(UserRole.SUPER_ADMIN));

// Dashboard
router.get("/dashboard", AdminController.getDashboardStats);

// Users
router.get("/users", AdminController.getAllUsers);
router.get("/users/:id", AdminController.getUserById);

// Update
router.patch("/users/:id/role", AdminController.updateRole);
router.patch("/users/:id/status", AdminController.updateStatus);

export default router;