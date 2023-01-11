'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfilePic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
    ProfilePic.User = ProfilePic.belongsTo(User,{foreignKey:'id'})
    }
  }
  ProfilePic.init({
    direction: DataTypes.TEXT,
    fileName: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ProfilePic',
  });
  return ProfilePic;
};