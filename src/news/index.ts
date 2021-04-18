import express from "express";
import NewsController from "./news.controller";
import NewsService from "./news.service";

import authRequired from "../middlewares/authRequired";
import cache from "../middlewares/cache";

export default () => {
  const router = express.Router();

  const service = new NewsService();
  const controller = new NewsController(service);

  router.get(
    "/news",
    authRequired,
    cache.route({ prefix: "news", expire: 3600 }),
    (req, res, next) => controller.search(req, res, next)
  );

  return router;
};
