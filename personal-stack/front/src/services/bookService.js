import api from "./instance";

export const getBooks = async () => {
  const { data } = await api.get();
  return data;
};

export const updateBook = async (id, body) => {
  const { data } = await api.put(`/${id}`, body);
  return data;
};

export const createBook = async (body) => {
  const { data } = await api.post("", body);
  return data;
};

export const deleteBook = async (id) => {
  const { data } = await api.delete(`/${id}`);
  return data;
};
