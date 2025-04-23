
const express = require("express");
const cors = require("cors");
const { checkConnection, syncModels } = require("./db/config");
const port = 3000;

const checkAndSync = async () => {
  await checkConnection();
  await syncModels();
};

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

const startAPI = async () => {
  await checkAndSync();
  await initializeAndListen();
};

startAPI();
