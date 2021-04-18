/* eslint-disable */
import dotenv from "dotenv";

dotenv.config();

export default {
  newsAPIKey: process.env.NEWS_API_KEY,
  environment: process.env.NODE_ENV || "dev",
  secretKey: process.env.JWT_SECRET || "mysecret",
  saltRound: 10,
  expiresIn: process.env.JWT_EXPIRY || "1d",
  port: Number(process.env.PORT || "8000"),
  redisHost: process.env.REDIS_HOST || "localhost",
  redisPort: Number(process.env.REDIS_PORT || "6379"),
  weatherAPIKey: process.env.WEATHER_API_KEY,
};
