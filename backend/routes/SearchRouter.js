const searchRouter = require("express").Router();
const { User } = require("../db/models");
const { Op } = require("sequelize");


searchRouter.post("/", async (req, res) => {
    try{
    const { user } = res.locals;
  
  const {username}  = req.body;

  const foundUsers = await User.findAll({ where: {name:{  [Op.substring]: `${username}`, }}, limit:8 });

  if(foundUsers){
    res.json(foundUsers.map((foundUser) => {return {id:foundUser.id, name:foundUser.name}}).filter((foundUser)=>foundUser.id!==user.id))}
    else{
      res.json([])
    }}
    catch(error){
        console.log(error);
    }
});


module.exports = searchRouter;
