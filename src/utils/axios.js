import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
      // baseURL: "http://localhost:5011/",
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
      withCredentials: true
    },
  });