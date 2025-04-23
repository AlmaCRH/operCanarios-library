const { body } = require("express-validator");

const validateBook = [
  body("titulo").isString().withMessage("El título tiene que ser una string."),
  body("autor").isString().withMessage("El autor tiene que ser una string."),
  body("anioPublicacion")
    .isInt({ min: 0 })
    .withMessage("El año de publicación debe ser un número entero positivo."),
];

module.exports = validateBook