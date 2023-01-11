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

    const secondUser = await User.findByPk(id);

    // const allChat = await Chat.findAll();
    // const name = allChat.map((el) => el.name);
    // console.log(name, 55555);
    // const status = name.find(secondUser.name);
    // console.log(status);
    // // if (allChat) {
    
      const chat = await Chat.create({ name: secondUser.name });
      await chat.addUser(user, { through: 'UsersChats' });
      await chat.addUser(secondUser, { through: 'UsersChats' });

    if (user) {

      if (chat) {
        const {io} = req.app.locals
        // const secondUserSocketId = findSocketOfUserFromMap(secondUser.id,io.sockets.sockets)
        
        // console.log(secondUserSocketId)

        // if(secondUserSocketId){
          io.to(`User_${secondUser.id}room`).emit('/users/recieveInvite', {name:chat.name,id:chat.id, Messages:[]})
        // console.log('Успех')}
        
        
        
        res.json( {name:chat.name, id:chat.id, Messages:[]} );
      } else {
        res.json([]);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = chatsRouter;
