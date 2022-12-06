import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const { REACT_APP_BASE_URL } = process.env;

axios.defaults.baseURL = REACT_APP_BASE_URL;

export const setToken = token => {
    axios.defaults.headers.common.Authorization = token
        ? `Bearer ${token}`
        : '';
};

axios.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.data.message === 'Not authorized') {
            const refreshToken = localStorage.getItem('refreshToken');
            try {
                const { data } = await axios.post('/users/refresh', {
                    refreshToken,
                });
                setToken(data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                error.config.headers.Authorization = `Bearer ${data.accessToken}`;

                return axios(error.config);
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
            await axios.post('/users/register', credentials);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const logOut = createAsyncThunk(
    'users/logout',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            await axios.get('/users/logout');
            localStorage.setItem('refreshToken', null);
            setToken(null);
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
        const isLoggedIn = thunkAPI.getState().user.isLoggedIn;
        if (refreshToken && !isLoggedIn) {
            try {
                const { data } = await axios.post('/users/refresh', {
                    refreshToken,
                });
                localStorage.setItem('refreshToken', data.refreshToken);
                setToken(data.accessToken);
                thunkAPI.dispatch(getUser());
                return data;
            } catch (error) {
                return thunkAPI.rejectWithValue(error);
            }
        }

        return { refreshToken: null };
    }
);

export const setDailyRate = createAsyncThunk(
    'users/dailyRate',
    async (info, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.patch('/users/dailyRate', info);
            const { dailyRate, bloodGroup } = data;
            return { dailyRate, bloodGroup };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
