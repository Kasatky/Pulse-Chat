require('dotenv').config();

const { sequelize } = require('./models');

// создаёт новую таблицу если её нет в БД
// если таблица уже есть, то ничего не делает
sequelize.sync();
