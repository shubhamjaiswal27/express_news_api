import { NextFunction, Request, Response } from "express";

import AuthService from "./auth.service";
import { ILoginBody, ISignupBody } from "./auth.dto";

export default class AuthController {
  private service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body: ILoginBody = req.body;

      const response = await this.service.login(body.email, body.password);

      res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const body: ISignupBody = req.body;

      const response = await this.service.signup(
        body.name,
        body.email,
        body.password
      );

      res.json(response);
    } catch (err) {
      next(err);
    }
  }
}
