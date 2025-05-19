
// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://192.168.0.14:3000/api', 
//   timeout: 5000,
// });

// export default instance;


import axios from 'axios';


const api = axios.create({
  baseURL: 'http://192.168.0.18:3000/api', // IP local 
  timeout: 5000,
});

export default api;
