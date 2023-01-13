'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Chat}) {
    Message.Chat = Message.belongsTo(Chat, {foreignKey:'chatId'})

    }
  }
  Message.init({
    username: {type: DataTypes.TEXT, allowNull:false, defaultValue:"Sonya"},
    text: {type: DataTypes.TEXT, allowNull:false},
    imageLink: {type: DataTypes.TEXT}
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};