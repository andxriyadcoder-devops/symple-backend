import { Response } from "express";

interface IResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: any;
  statusCode: number;
}

export const sendResponse = <T>(
  res: Response,
  payload: IResponse<T>,
) => {
  const {
    success,
    message,
    data,
    meta,
    statusCode,
  } = payload;

  return res.status(statusCode).json({
    success,
    message,
    meta,
    data,
  });
};