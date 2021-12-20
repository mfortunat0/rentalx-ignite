import express, { NextFunction, Request, Response } from "express";
import * as swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import swaggerFile from "../../../swagger.json";
import "../typeorm";
import "../../container";
import { AppError } from "../../errors/AppError";
import "express-async-errors";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }
    return response.status(500).json({
      status: "erro",
      message: `Internal server error ${err.message}`,
    });
  }
);

app.listen(3000);
