import axios from 'axios';
// import { store } from 'redux/store';

const { REACT_APP_BASE_URL } = process.env;

const api = axios.create({ baseURL: REACT_APP_BASE_URL });

api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401) {
            console.log('????');
            try {
                // const { dispatch } = store;
                // dispatch(refresh());

                console.log('2222');

                // error.config.headers.Authorization = `Bearer ${data.accessToken}`;
                return axios(error.config);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
