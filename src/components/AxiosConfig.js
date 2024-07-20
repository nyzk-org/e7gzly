import axios from "axios";

const token = localStorage.getItem("token");
const apiUrl = "http://b774e9f2d247.ngrok.io/";

// For non-authorized requests
const unAuthAxios = axios.create({
  baseURL: apiUrl
});

// For authorized requests
const authAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export { authAxios };
export { unAuthAxios };
export { apiUrl };