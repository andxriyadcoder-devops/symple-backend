import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "@/config/env";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const auth =
  (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization;

      if (!header) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const token = header.split(" ")[1];

      const decoded = jwt.verify(token, env.JWT_SECRET) as {
        id: string;
        role: string;
      };

      req.user = decoded;

      if (
        roles.length &&
        !roles.includes(decoded.role)
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      next();
    } catch {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
  };