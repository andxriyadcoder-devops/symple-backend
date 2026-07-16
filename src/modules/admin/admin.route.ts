import { Router } from "express";
import { AdminController } from "./admin.controller";
import { auth } from "@/middleware/auth";
import { UserRole } from "@/shared/enums";

const router = Router();

router.use(auth(UserRole.SUPER_ADMIN));

router.get("/dashboard", AdminController.getDashboardStats);

router.get("/users", AdminController.getAllUsers);

router.get("/users/:id", AdminController.getUserById);

router.patch("/users/:id/role", AdminController.updateRole);

router.patch("/users/:id/status", AdminController.updateStatus);

export default router;