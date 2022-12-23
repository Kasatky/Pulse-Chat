require('dotenv').config();

const { sequelize } = require('./models');

// удаляем все таблицы, а потом создаём новые
async function main() {
  await sequelize.drop();
  await sequelize.sync();
}

main();
