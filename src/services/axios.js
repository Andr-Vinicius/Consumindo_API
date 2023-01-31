import axios from "axios";

// Requisição básica assíncrona com o Axios
export default axios.create // Já exporta a função .create(), que é um objeto
({
  baseURL: 'https://api-rest-wzmf.onrender.com/',
});
