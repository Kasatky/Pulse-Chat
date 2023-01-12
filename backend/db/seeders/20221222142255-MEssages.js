"use strict";
const { Message, User, Chat } = require("../models");

const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Message.bulkCreate([
      { username: "Test", text: "Test" },
      { username: "Test", text: "Test" },
    ]);

    const firstUser = await User.create({
      name: "Admin",
      email: "Admin",
      password: bcrypt.hashSync("Admin", 10),
    });

    const secondUser = await User.create({
      name: "User",
      email: "User",
      password: bcrypt.hashSync("User", 10),
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
