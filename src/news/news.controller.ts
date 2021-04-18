import { NextFunction, Request, Response } from "express";

import NewsService from "./news.service";

export default class AuthController {
  private service: NewsService;

  constructor(service: NewsService) {
    this.service = service;
  }

  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { search, page } = req.query;

      const pageNo = Number((page as string) || "1");
      const query = String((search as string) || "");

      const response = await this.service.getPage(query as string, pageNo);

      res.json(response);
    } catch (err) {
      next(err);
    }
  }
}
