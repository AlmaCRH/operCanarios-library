const { getConnection } = require("../../db/config");
const { DataTypes } = require("sequelize");

const connection = getConnection();

const Book = connection.define(
  "book",
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    autor: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    anioPublicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Book;
