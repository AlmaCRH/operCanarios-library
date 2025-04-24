const Book = require("../models/book.model");


//En cada función verá que se usa el error 500 (server error) para indicar de que algo va mal con el servidor, o la manera
//en que se enviaron los datos, es un código de error de casos generales.

//Función para obtener todos los libros, en caso positivo lo envíamos y devolvemos un HTTP 200
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMsg: error.message });
  }
};

//Función para obtener un libro, en caso positivo lo envíamos y devolvemos un HTTP 200, 
// en caso contrario devolvemos 404 (not found) y damos un mensaje de error personalizado
const getBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "No se ha encontrado el libro" });
    }
    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMsg: error.message });
  }
};

//Función para crear un libro, en caso positivo lo envíamos y devolvemos un HTTP 201 (created)
const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMsg: error.message });
  }
};

//Función para crear un libro, en caso positivo devolvemos 200 y un mensaje personalizado,
//en el caso contrario 404 ya que no se encuentra el libro que se desea actualizar
const updateBook = async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updated) {
      return res.status(404).json({ error: "No hay cambios que actualizar" });
    }
    return res.status(200).json({ message: "Libro actualizado" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMsg: error.message });
  }
};

//Función para borrar un libro, en caso positivo devolvemos 200 y en caso negativo 404 (no se encontró el libro que quiere eliminar)
const deleteBook = async (req, res) => {
  try {
    const deleted = await Book.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleted) {
      return res.status(404).json({ error: "No se ha encontrado el libro" });
    }
    return res.status(200).json({ message: "Libro eliminado" });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ errorMsg: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
