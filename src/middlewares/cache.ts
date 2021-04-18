import config from "../config";

const cache = require("express-redis-cache")({
  host: config.redisHost,
  port: config.redisPort,
});

export default cache;
