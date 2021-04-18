import express from "express";
import { Request, Response, NextFunction } from "express";

import bodyParser from "body-parser";
import cors from "cors";

import config from "./config";

import authRoutes from "./auth";
import newsRoutes from "./news";
import weatherRoutes from "./weather";

import { HttpException } from "./utils/errors";

const app = express();
const PORT = config.port;

app.use(bodyParser.json());
app.use(cors());

app.use(authRoutes());
app.use(newsRoutes());
app.use(weatherRoutes());

// eslint-disable-next-line
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof HttpException) {
    return res.status(err.status).json({ error: err.message });
  }

  return res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

module.exports = app;
