const { body } = require("express-validator");
//Con esta librería podremos comprobar el body y validar que son del tipo correcto, en caso contrario saltará un error con mensaje personalizado.
const validateBook = [
  body("portada")
    .isString()
    .withMessage("La portada tiene que ser una string."),
  body("titulo").isString().withMessage("El título tiene que ser una string."),
  body("autor").isString().withMessage("El autor tiene que ser una string."),
  body("anioPublicacion")
    .isInt({ min: 0 })
    .withMessage("El año de publicación debe ser un número entero positivo."),
];

module.exports = validateBook;
