'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Message}) {
      Chat.Users = Chat.belongsToMany(User, {foreignKey:'chatId',through:'UsersChats'})
      Chat.Messages = Chat.hasMany(Message, {foreignKey:'chatId'})
    }
  }
  Chat.init({
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};