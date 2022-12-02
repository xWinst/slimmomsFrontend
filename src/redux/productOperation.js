import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllProducts = createAsyncThunk(
    'getProduct',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/products`);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const add = createAsyncThunk(
    'addProduct',
    async (product, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/products`, product);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getUserProducts = createAsyncThunk(
    'getUserProduct',
    async (date, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/products/${date}`);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteUserProducts = createAsyncThunk(
    'products/id',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`/products/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
