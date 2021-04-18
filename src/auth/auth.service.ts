import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ValidationError } from "sequelize";
import User from "./user.entity";
import { IAuthResponse } from "./auth.dto";

import config from "../config";
import { HttpException } from "../utils/errors";

export default class AuthService {
  async signup(
    name: string,
    email: string,
    password: string
  ): Promise<IAuthResponse> {
    try {
      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        const accessToken = jwt.sign({ userId: user.id }, config.secretKey, {
          expiresIn: config.expiresIn,
        });

        return {
          accessToken,
        };
      }

      throw new HttpException(400, "Bad Request");
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new HttpException(400, "Invalid data");
      } else {
        throw new HttpException();
      }
    }
  }

  async login(email: string, password: string): Promise<IAuthResponse> {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        const accessToken = jwt.sign({ userId: user.id }, config.secretKey, {
          expiresIn: config.expiresIn,
        });

        return {
          accessToken,
        };
      }
    }

    throw new HttpException(401, "Invalid email or password");
  }
}
