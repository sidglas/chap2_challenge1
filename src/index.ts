import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";

import { AppError } from "./modules/errors/AppError";
import { usersRoutes } from "./routes/users.routes";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(400).json({
      status: "Error",
      message: `Internal server error ${err.message}`,
    });
  }
);

export { app };
