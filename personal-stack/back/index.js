
const express = require("express");
const cors = require("cors");
const { checkConnection, syncModels } = require("./db/config");
const port = 3000;

//Llamamos a las funciones que establecen la conexión con la db y añaden las tablas
const checkAndSync = async () => {
  await checkConnection();
  await syncModels();
};

/*
Iniziamos express y levantamos el servidor, habilitando CORS para la conexión con el frontend y parseamos las respuestas en formato JSON,
además establecemos la ruta con la que nos comunicaremos.
*/
const initializeAndListen = async () => {
  try {
    const app = express()
      .use(cors())
      .use(express.json())
      .use("/api", require("./api/router"));
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error(error);
  }
};

//Iniciamos la API
const startAPI = async () => {
  await checkAndSync();
  await initializeAndListen();
};

startAPI();
