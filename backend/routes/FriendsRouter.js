const chatsRouter = require('express').Router();
const { User, Chat } = require('../db/models');
const { Op } = require('sequelize');

chatsRouter.post('/', async (req, res) => {
  try {
    const { user } = res.locals;

    if (user) {
      const userWithChats = await User.findByPk(user.id, { include: { all: true, nested: true } });

      console.log(userWithChats.Chats);

      if (userWithChats) {
        res.json(userWithChats.Chats);
      } else {
        res.json([]);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

chatsRouter.post('/add', async (req, res) => {
  try {
    const { user } = res.locals;
    console.log(user.name, 8888888888888888888);

    const { id } = req.body;
    console.log(id, 777777777777777);

    const secondUser = await User.findByPk(id);
    console.log(secondUser);

    // const allChat = await Chat.findAll();
    // const name = allChat.map((el) => el.name);
    // console.log(name, 55555);
    // const status = name.find(secondUser.name);
    // console.log(status);
    // // if (allChat) {
      const chat = await Chat.create({ name: secondUser.name });
      await chat.addUser(user, { through: 'UsersChats' });
      await chat.addUser(secondUser, { through: 'UsersChats' });
    // }

    console.log(chat);

    if (user) {
      if (chat) {
        res.json({ friend: { id: secondUser.id, name: secondUser.name }, chatId: chat.id });
      } else {
        res.json([]);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = chatsRouter;
