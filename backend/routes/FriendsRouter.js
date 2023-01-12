const chatsRouter = require('express').Router();
const { User, Chat } = require('../db/models');
const { Op } = require('sequelize');

function findSocketOfUserFromMap(userId, sockets){
  console.log(sockets)

  const id =  [...sockets].find((socket)=>{
    console.log(`${socket[1].userId} === ${userId}`)
    return socket[1].userId === userId
  })
  return id ? id[0]:id
}

chatsRouter.post('/', async (req, res) => {
  try {
    const { user } = res.locals;


    if (user) {
      const userWithChats = await User.findByPk(user.id, { include: { all: true, nested: true } });

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

    const { id } = req.body;

    const secondUser = await User.findOne({where: id, include:{ all: true, nested: true }} );;
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
    const {io} = req.app.locals

    if (user) {

      if (chat) {
        if (secondUser.ProfilePic) {
        
        
        io.to(`User_${secondUser.id}room`).emit('/users/recieveInvite', {name:chat.name,id:chat.id, Messages:[], image: secondUser.ProfilePic.fileName})
         
         res.json( {
          name:chat.name, id:chat.id, Messages:[], image: secondUser.ProfilePic.fileName
        } );
        } else {
          io.to(`User_${secondUser.id}room`).emit('/users/recieveInvite', {name:chat.name,id:chat.id, Messages:[]})
          res.json( { name:chat.name, id:chat.id, Messages:[]})}
      } else {
        res.json([]);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = chatsRouter;
