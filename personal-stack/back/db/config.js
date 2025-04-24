require("dotenv").config();
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

let connection = null; //Inicializamos la variable en null para luego asignar un valor.

const checkDB = async () => {
  try {
    // A continuación creamos una conexión temporal con mysql para crear la base de datos en caso de que no exista.
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
    //Una vez creada cerramos la conexión y llamamos a la función que crea la conexión que usaremos en adelante
    await setupConnection();
  } catch (error) {
    console.error(error);
  }
};

const setupConnection = async () => {
  //Creamos una nueva instancia de sequelize para conectarnos a la base de datos y la guardamos en connection
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
    //Aquí miramos primero si la db existe y luego nos conectamos a la base de datos
    await checkDB();
    await connection.authenticate();
    console.log("connected!");
  } catch (error) {
    console.error(error);
  }
};

/*
Esta función nos servirá para recoger la conexión donde necesitemos, 
evitando así exportar la variable dejándola expuesta a cambios y evitando dependencias circulares.
Lo cual ocurre cuando tenemos más modelos y hay que relacionarlos.
*/
const getConnection = () => {
  if (!connection) {
    throw new Error(`Cannot initialize the local variable`);
  }
  return connection;
};

const syncModels = async () => {
  try {
    //Importamos nuestro modelo y sincronizamos con la base de datos, esto creará las tablas con sus columnas correspondientes.
    const Book = require("../api/models/book.model");
    await connection.sync();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getConnection, checkConnection, syncModels };
