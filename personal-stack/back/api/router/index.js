const router = require("express").Router();

//Guardamos el router de los libros en nuestro router principal
const bookRouter = require("./book.router");

router.use("/books", bookRouter);

module.exports = router;
