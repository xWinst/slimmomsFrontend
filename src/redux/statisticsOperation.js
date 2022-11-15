import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getStatistics = createAsyncThunk('transaction/period', async (date, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/transaction/period-data?date=2022-${date}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
});
