const { MYSQL_DB, MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } = require("./env");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
