import api from "./instance";

export const getBooks = async () => {
  // llamamos al endpoint de getAllBooks, recogemos data haciendo destructuring y lo devolvemos
  const { data } = await api.get();
  return data;
};

export const updateBook = async (id, body) => {
  //llamamos al endpoint de updateBook y pasamos por parámetros el body, el id se pasa usando template literals
  const { data } = await api.put(`/${id}`, body);
  return data;
};

export const createBook = async (body) => {
  /* se llama al endpoint de post para crear un libro con createBook, dejamos las comillas vacías ya que no hay que //cambiar ela URL y pasamos el body por parámetros*/
  const { data } = await api.post("", body);
  return data;
};

export const deleteBook = async (id) => {
  //Se llama al endpoint de deleteBook y pasamos la id usando template literals
  const { data } = await api.delete(`/${id}`);
  return data;
};
