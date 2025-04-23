const router = require("express").Router();
const validateBook = require("../middleware/book.validator");
const handleBookValidation = require("../middleware/handleBookValidation");

const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");


router.get("/", getAllBooks);
router.get("/:id", getBook);
router.post("/", validateBook, handleBookValidation, createBook);
router.put("/:id", validateBook, handleBookValidation, updateBook);
router.delete("/:id", deleteBook);

module.exports = router
