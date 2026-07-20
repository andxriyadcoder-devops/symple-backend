import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateRequest =
  (schema: z.ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        });

        next();
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: error.issues.map((issue) => ({
              field: issue.path.join("."),
              message: issue.message,
            })),
          });
        }

        next(error);
      }
    };