import axios from 'axios';



const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});

instance.defaults.withCredentials = true



instance.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        // const { data } = response;
        return response.data;
    },
    (error) => {
        const status = error && error.response ? error.response.status : 500;
        console.log(status)
        switch (status) {
            // authentication (token related issues)
            case 401: {
              return Promise.reject(error);
            }
      
            // forbidden (permission related issues)
            case 403: {
              return Promise.reject(error);
            }
      
            // bad request
            case 400: {
              return Promise.reject(error);
            }
      
            // not found
            case 404: {
              return Promise.reject(error);
            }
      
            // conflict
            case 409: {
              return Promise.reject(error);
            }
      
            // unprocessable
            case 422: {
              return Promise.reject(error);
            }
      
            // generic api error (server related) unexpected
            default: {
              return Promise.reject(error);
            }
          }
       
    }
);



// instance.interceptors.response.use(
//     (response) => {

//         return response.data;
//     }
// );

export default instance;
