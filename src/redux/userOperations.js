import axios from 'axios';
// import api from 'services/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
// import { store } from './store';

const { REACT_APP_BASE_URL } = process.env;

// const instance = axios.create({ baseURL: REACT_APP_BASE_URL }); ////////////////
axios.defaults.baseURL = REACT_APP_BASE_URL;

export const setToken = token => {
    axios.defaults.headers.common.Authorization = token
        ? `Bearer ${token}`
        : '';
};

// let count = 2;
axios.interceptors.response.use(
    response => response,
    async error => {
        // console.log(error.config.headers.Authorization);
        if (error.response.status === 401) {
            // count--;
            // console.log('axios ', axios);
            // console.log('start headers: ', axios.defaults.headers);
            // console.log('start error.headers: ', error.config.headers);
            const refreshToken = localStorage.getItem('refreshToken');
            // console.log('refreshToken: ', refreshToken.length);
            // console.log('????', JSON.parse(localStorage.getItem('persist:user')));
            try {
                // const { dispatch } = store;
                // console.log('data: ', data);
                const { data } = await axios.post('/users/refresh', {
                    refreshToken,
                });
                // console.log('data: ', data);
                // // refresh();
                // console.log('2222');
                setToken(data.accessToken);
                // console.log('axios.defaults.headers: ', axios.defaults.headers);
                // console.log('error.config.headers: ', error.config.headers);
                localStorage.setItem('refreshToken', data.refreshToken);
                error.config.headers.Authorization = `Bearer ${data.accessToken}`;
                return axios(error.config);
                // if (count)
                // else {
                //     count = 2;
                //     return null;
                // }
            } catch (error) {
                console.log('error: ', error);
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export const logIn = createAsyncThunk(
    'users/login',
    async (credentials, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.post('/users/login', credentials);
            setToken(data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const registration = createAsyncThunk(
    'users/register',
    async (credentials, { rejectWithValue, dispatch }) => {
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
    }
);

export const logOut = createAsyncThunk(
    'users/logout',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            await axios.get('/users/logout');
            setToken(null);
            // dispatch(resetStatistics());
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getUser = createAsyncThunk(
    'getUser',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/users/user');
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const refresh = createAsyncThunk(
    'users/refresh',
    async (_, thunkAPI) => {
        const refreshToken = thunkAPI.getState().user.refreshToken;
        // console.log('refreshToken: ', refreshToken);
        const isLoggedIn = thunkAPI.getState().user.isLoggedIn;
        // console.log('isLoggedIn: ', isLoggedIn);
        // console.log('REFRESH !!!! ');
        if (!refreshToken || isLoggedIn)
            return thunkAPI.rejectWithValue('CANCEL');
        setToken(refreshToken);

        try {
            const { data } = await axios.post('/users/refresh', {
                refreshToken,
            });
            // console.log('REFRESH data: ', data);
            localStorage.setItem('refreshToken', data.refreshToken);
            setToken(data.accessToken);
            thunkAPI.dispatch(getUser());
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const setDailyRate = createAsyncThunk(
    'users/dailyRate',
    async (dailyRate, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.patch('/users/dailyRate', dailyRate);
            return data.dailyRate;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
