import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllProducts = createAsyncThunk('getProduct', async (date, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/products`);
        console.log('data: ', data);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addProducts = createAsyncThunk('getProduct', async (date, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/products`);
        console.log('data: ', data);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});
