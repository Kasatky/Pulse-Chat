"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      User.Friends = User.belongsToMany(User, {foreignKey:'friend1Id',through:'Friends', as: 'Friends1'})
      User.Friends2 = User.belongsToMany(User, {foreignKey:'friend2Id',through:'Friends' , as: 'Friends2'})
    }
  }
  User.init(
    {
      name: { type: DataTypes.TEXT, allowNull: false, unique: false },
      email: { type: DataTypes.TEXT, allowNull: false, unique: true, onDelete: 'CASCADE'},
      password: { type: DataTypes.TEXT, allowNull: false, unique: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
