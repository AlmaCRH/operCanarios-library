const { validationResult } = require("express-validator");
//Aquí usaremos este middleware para usar los mensajes personalizados que definimos en book.validator.js, dando el error HTTP adecuado
const handleBookValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map((e) => e.msg) }); //error 400 bad request (campos con los tipos equivocados)
  }
  next();
};

module.exports = handleBookValidation