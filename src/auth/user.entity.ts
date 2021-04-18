import { Model, DataTypes, Optional } from "sequelize";
import bcrypt from "bcrypt";

import sequelize from "../db";

import config from "../config";

interface IUserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface IUserCreationAttributes extends Optional<IUserAttributes, "id"> {}

class User
  extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes {
  public id!: number;

  public name!: string;

  public email!: string;

  public password!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

// eslint-disable-next-line
User.beforeCreate(async (user, options) => {
  const hashedPassword: string = await bcrypt.hash(
    user.password,
    config.saltRound
  );
  user.password = hashedPassword;
});

User.sync();

export default User;
