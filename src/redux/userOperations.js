import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL; ////////////////

export const setToken = token => {
    axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';
};

export const logIn = createAsyncThunk('users/login', async (credentials, { rejectWithValue, dispatch }) => {
    try {
        const { data } = await axios.post('/users/login', credentials);
        setToken(data.token);
        console.log(data);
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

// export const getUser = createAsyncThunk('getUser', async (_, { rejectWithValue }) => {
//     try {
//         const { data } = await axios.get('/user');
//         return data;
//     } catch (error) {
//         return rejectWithValue(error);
//     }
// });

// export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
//     const refreshToken = thunkAPI.getState().user.refreshToken;
//     const isLoggedIn = thunkAPI.getState().user.isLoggedIn;

//     if (!refreshToken || isLoggedIn) return thunkAPI.rejectWithValue('CANCEL');
//     setToken(refreshToken);

//     try {
//         const { data } = await axios.post('/auth/refresh', { sid });
//         setToken(data.newAccessToken);;
//         thunkAPI.dispatch(getUser());
//         return data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error);
//     }
// });
