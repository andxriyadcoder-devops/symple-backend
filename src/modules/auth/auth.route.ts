import { Router } from "express";

import authController from "./auth.controller";
import { auth } from "@/middleware/auth";
import { validateRequest } from "@/middleware/validateRequest";

import { registerSchema } from "./validation/register.validation";
import { loginSchema } from "./validation/login.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register,
);

router.post(
  "/login",
  validateRequest(loginSchema),
  authController.login,
);

router.get(
  "/me",
  auth(),
  authController.me,
);

export default router;