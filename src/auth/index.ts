import express from "express";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";

export default () => {
  const router = express.Router();

  const service = new AuthService();
  const controller = new AuthController(service);

  router.post("/auth/login", (req, res, next) => controller.login(req, res, next));
  router.post("/auth/signup", (req, res, next) => controller.signup(req, res, next));

  return router;
};
