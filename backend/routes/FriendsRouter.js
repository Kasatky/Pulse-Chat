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
      
      const correctedChats = await userWithChats.Chats.map(async(chat)=>{
        const secondUser = await chat.user1Id === user.id ? await User.findByPk(chat.user2Id,{include:{ all: true, nested: true }})  : await User.findByPk(chat.user1Id,{include:{ all: true, nested: true }}) 
        return { name:secondUser.name, id:(chat.id), Messages:chat.Messages, image:secondUser.ProfilePic?.fileName}
      })
      
      if (userWithChats) {
        Promise.all(correctedChats).then((data) =>
        {console.log(data)
          res.json(data)}
        )
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
    // }
    const existingChat = await Chat.findOne({where:{
      [Op.or]: [
      {name: `${user.name}|${user.id}<>${secondUser.name}|${secondUser.id}`},
      {name: `${secondUser.name}|${secondUser.id}<>${user.name}|${user.id}`}
    ]}})

    if(existingChat){
      console.log('chat already exists')
      return res.json([])
    }
    else{
      const chat = await Chat.create({ name: `${user.name}|${user.id}<>${secondUser.name}|${secondUser.id}`,user1Id:user.id,user2Id:secondUser.id });

      await chat.addUser(user, { through: 'UsersChats' });
      await chat.addUser(secondUser, { through: 'UsersChats' });

    const {io} = req.app.locals

    if (user) {

      if (chat) {
        
        io.to(`User_${secondUser.id}room`).emit('/users/recieveInvite', {name:user.name,id:chat.id, Messages:[], image: user.ProfilePic?.fileName})
         res.json( {
          name:secondUser.name, id:chat.id, Messages:[], image: secondUser.ProfilePic?.fileName
        } );
      }
        
      } else {
        res.json([]);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = chatsRouter;
