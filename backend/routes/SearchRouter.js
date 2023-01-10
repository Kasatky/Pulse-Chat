const searchRouter = require("express").Router();
const { User } = require("../db/models");
const { Op } = require("sequelize");


searchRouter.post("/search", async (req, res) => {
    try{
  
  const {username}  = req.body;

  const foundUsers = await User.findAll({ where: {name:{  [Op.substring]: `${username}`, }}, limit:8 });


  if(foundUsers){
    res.json(foundUsers.map((user) => {return {id:user.id, name:user.name}}))}
    else{
      res.json([])
    }}
    catch(error){
        console.log(error);
    }
});


module.exports = searchRouter;
