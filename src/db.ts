import { Sequelize } from "sequelize";

import config from "./config";

let sequelize: Sequelize;

if (config.environment === "test") {
  sequelize = new Sequelize("sqlite::memory:", {
    logging: false,
  });
} else {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "../../database.sqlite",
    logging: false,
  });
}

export default sequelize;
