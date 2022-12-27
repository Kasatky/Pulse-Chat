const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../db/models");

authRouter.get("/user", async (req, res) => {
  const { user } = res.locals;

  if (user) {
    res.json({
      isLoggedIn: true,
      user: {
        id: user.id,
        name: user.name,
      },
    });
  } else {
    res.json({ isLoggedIn: false, user: undefined });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  // проверяем, что такой пользователь есть в БД и пароли совпадают
  if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
    // кладём id нового пользователя в хранилище сессии (логиним пользователя)
    req.session.userId = existingUser.id;
    // req.session.user = existingUser;
    res.json({ id: existingUser.id, name: existingUser.name });
  } else {
    res
      .status(401)
      .json({ error: "Такого пользователя нет либо пароли не совпадают" });
  }
});

authRouter.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

authRouter.post("/registration", async (req, res) => {
  const { name, email, password, passwordRepeat } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  // проверяем есть ли уже такой пользователь в БД
  if (existingUser) {
    return res.json("Такой пользователь уже есть");
  }
  if (password === passwordRepeat) {
    // создаём нового пользователя
    const user = await User.create({
      name,
      email,
      // хэшируем пароль, чтобы не хранить в открытом виде в БД
      password: await bcrypt.hash(password, 10),
    });

    // кладём id нового пользователя в хранилище сессии (сразу логиним пользователя)
    req.session.userId = user.id;

    return res.json({ id: user.id, name: user.name });
  }
  return res.json("пароли не совпадают");
});

module.exports = authRouter;
