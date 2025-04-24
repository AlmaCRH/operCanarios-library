const Book = require("../models/book.model");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: error, errorMsg: error.message });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "No se ha encontrado el libro" });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error: error, errorMsg: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ error: error, errorMsg: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updated) {
      return res.status(404).json({ error: "No se ha encontrado el libro" });
    }
    return res.status(200).json({ message: "Libro actualizado" });
  } catch (error) {
    return res.status(500).json({ error: error, errorMsg: error.message });
  }
};

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
    return res.status(501).json({ error: error, errorMsg: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
