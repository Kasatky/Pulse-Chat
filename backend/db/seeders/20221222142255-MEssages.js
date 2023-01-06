"use strict";
const { Message, User } = require("../models");
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Message.bulkCreate([
      { username: "Test", text: "Test" },
      { username: "Test", text: "Test" },
    ]);

    await User.create({
      name: "Admin",
      email: "Admin",
      password: bcrypt.hashSync("Admin", 10),
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
