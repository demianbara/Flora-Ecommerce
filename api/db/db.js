const Sequelize = require("sequelize");
const chalk = require("chalk");

console.log(chalk.yellow("\n Openning connection to Postgres"));

const db = new Sequelize("postgres://demian:routes@localhost:5432/flora", {
  loggin: false,
});

module.exports = db;
