const   chatsRouter = require("express").Router();
const { User, Chat } = require("../db/models");
const { Op } = require("sequelize");


chatsRouter.post("/", async (req, res) => {
 try{
    const { user } = res.locals;
    
    if(user){
    
    const userWithChats = await User.findByPk(user.id,{include:{ all: true, nested: true }});

    if(userWithChats){
      res.json(userWithChats.Chats)}

      else{
      res.json([])
    }}
  }
    catch(error){
        console.log(error);
    }
});


chatsRouter.post("/add", async (req, res) => {
 try{
    const { user } = res.locals;

    const { id:chatUserId } = req.body;
    
    const secondUser = await User.findByPk(chatUserId)

    const chat = await Chat.create({name:'someName'})

    await chat.addUser(user, {through:'UsersChats'})
    await chat.addUser(secondUser, {through:'UsersChats'})

    if(user){

    if(chat){
      res.json({friend:{id:secondUser.id, name:secondUser.name}, chatId:chat.id})}

      else{
      res.json([])
    }}
  }
    catch(error){
        console.log(error);
    }
});

module.exports = chatsRouter;
