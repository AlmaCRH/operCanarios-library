import axios from "axios";
//Importamos axios y creamos una instancia con nuestra URL, en este caso como solo tenemos un endpoint podemos dejarla entera.
const api = axios.create({
  baseURL: "http://localhost:3000/api/books",
});

export default api;