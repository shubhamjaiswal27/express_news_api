import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import config from "../config";
import { HttpException } from "../utils/errors";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    if (token) {
      const decoded = jwt.verify(token, config.secretKey);

      if (decoded) {
        next();

        return;
      }
    }

    throw new HttpException(401, "UnAuthorized: Please provide valid token");
  } catch (err) {
    next(err);
  }
};
