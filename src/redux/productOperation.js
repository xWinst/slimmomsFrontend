import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const add = createAsyncThunk(
    'addProduct',
    async (product, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`/userData/addProduct`, product);
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
            const { data } = await axios.get(`/userData/${date}`);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteUserProducts = createAsyncThunk(
    'removeProduct',
    async (product, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(
                `/userData/removeProduct`,
                product
            );
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateWeight = createAsyncThunk(
    'updateWeight',
    async (weight, { rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`/userData/weight`, weight);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getReports = createAsyncThunk(
    'getReports',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/userData`);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
