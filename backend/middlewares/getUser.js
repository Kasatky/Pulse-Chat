const { User } = require("../db/models");

module.exports = function getUser(io) {
  return async (req, res, next) => {
    // если пользователь залогинен, то в хранилище сессии лежит его userId
    const { userId } = req.session;

    const user = userId && (await User.findByPk(userId));

    // теперь если пользователь залогинен, то в он будет лежать в req.user

    res.locals.user = user;

    io.use((socket, next) => {
      socket.handshake.session.user = user;
      socket.handshake.session.save();
      next();
    });

    next();
  };
};
