import { NextFunction, Request, Response } from "express";

import WeatherService from "./weather.service";

export default class AuthController {
  private service: WeatherService;

  constructor(service: WeatherService) {
    this.service = service;
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.service.getForcast();

      res.json(response);
    } catch (err) {
      next(err);
    }
  }
}
