"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ProfilePic}) {
      User.ProfilePic = User.hasOne(ProfilePic, {foreignKey:'id'})
    }
  }
  User.init(
    {
      name: { type: DataTypes.TEXT, allowNull: false, unique: false },
      email: { type: DataTypes.TEXT, allowNull: false, unique: true },
      password: { type: DataTypes.TEXT, allowNull: false, unique: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
