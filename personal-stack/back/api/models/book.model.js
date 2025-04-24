const { getConnection } = require("../../db/config");
const { DataTypes } = require("sequelize");

//Aquí recogemos la conexión a través de la función y definimos las columnas del modelo, usamos allowNull para que sea requerido.
const connection = getConnection();

const Book = connection.define(
  "book",
  {
    portada: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    timestamps: false, //Esto evita las columnas created_at y updated_at que a menudo dan problemas
  }
);

module.exports = Book;
