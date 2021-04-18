import express from "express";
import WeatherController from "./weather.controller";
import WeatherService from "./weather.service";

import cache from "../middlewares/cache";

export default () => {
  const router = express.Router();

  const service = new WeatherService();
  const controller = new WeatherController(service);

  router.get(
    "/weather",
    cache.route({ name: "weather", expire: 3600 }),
    (req, res, next) => controller.get(req, res, next)
  );

  return router;
};
