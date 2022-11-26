import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const { REACT_APP_BASE_URL } = process.env;

// // const instance = axios.create({ baseURL: REACT_APP_BASE_URL }); ////////////////
axios.defaults.baseURL = REACT_APP_BASE_URL;

export const setToken = token => {
    axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';
};

axios.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401) {
            // const refreshToken = localStorage.getItem('refreshToken');
            try {
                const data = refresh();
                console.log('????');
                // refresh();
                // setToken(data.accessToken);
                // localStorage.setItem('refreshToken', data.refreshToken);

                error.config.headers.Authorization = `Bearer ${data.accessToken}`;

                return axios(error.config);
            } catch (error) {
                console.log('HI');
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export const logIn = createAsyncThunk('users/login', async (credentials, { rejectWithValue, dispatch }) => {
    try {
        const { data } = await axios.post('/users/login', credentials);
        setToken(data.accessToken);
        // localStorage.setItem('refreshToken', data.refreshToken);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const registration = createAsyncThunk('users/register', async (credentials, { rejectWithValue, dispatch }) => {
    try {
        const { data } = await axios.post('/users/register', credentials);
        // dispatch(logIn(credentials));
        // return data;
        console.log(data);
    } catch (error) {
        // if (error.response.status === 409) {
        //     dispatch(logIn(credentials));
        // } else
        return rejectWithValue(error);
    }
});

export const logOut = createAsyncThunk('users/logout', async (_, { rejectWithValue, dispatch }) => {
    try {
        await axios.get('/users/logout');
        setToken(null);
        // dispatch(resetStatistics());
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getUser = createAsyncThunk('getUser', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/users/user');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const refresh = createAsyncThunk('users/refresh', async (_, thunkAPI) => {
    const refreshToken = thunkAPI.getState().user.refreshToken;
    // console.log('refreshToken: ', refreshToken);
    const isLoggedIn = thunkAPI.getState().user.isLoggedIn;
    // console.log('isLoggedIn: ', isLoggedIn);

    if (!refreshToken || isLoggedIn) return thunkAPI.rejectWithValue('CANCEL');
    setToken(refreshToken);

    try {
        const { data } = await axios.post('/users/refresh', { refreshToken });
        console.log('REFRESH data: ', data);
        setToken(data.accessToken);
        thunkAPI.dispatch(getUser());
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
