import axios from 'axios';

// const signup = (username, password) => {
//   return axios
//     .post('/api/auth/signup', { email, password,firstName,lastName,address })
//     .then(response => {
//       return response.data;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

const login = (email, password) => {
  return axios
    .post('/api/auth/login', { email, password })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};


const logout = () => {
  return axios
    .delete('/api/auth/logout')
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export {  login, logout }