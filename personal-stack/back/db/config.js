require("dotenv").config();
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

let connection = null;

const checkDB = async () => {
  try {
    const mysqlConnection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    });
    await mysqlConnection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`
    );
    await mysqlConnection.end();
    await setupConnection();
  } catch (error) {
    console.error(error);
  }
};

const setupConnection = async () => {
  connection = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      dialect: process.env.DIALECT,
      port: process.env.DATABASE_PORT,
      logging: false,
    }
  );
};

const checkConnection = async () => {
  try {
    await checkDB();
    await connection.authenticate();
    console.log("connected!");
  } catch (error) {
    console.error(error);
  }
};

const getConnection = () => {
  if (!connection) {
    throw new Error(`Cannot initialize the local variable`);
  }
  return connection;
};

const syncModels = async () => {
  try {
    const Book = require("../api/models/book.model");
    await connection.sync();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getConnection, checkConnection, syncModels };
