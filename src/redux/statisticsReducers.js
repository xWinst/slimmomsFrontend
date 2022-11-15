import { createSlice } from '@reduxjs/toolkit';
import message from 'helpers/Message';
import { getStatistics } from './statisticsOperation';

const initialState = {};

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        resetStatistics: state => {
            state.expenses.total = null;
            state.expenses.data = null;
            state.incomes.total = null;
            state.incomes.data = null;
        },
    },
    extraReducers: {
        [getStatistics.fulfilled]: (state, action) => {
            state.expenses.total = action.payload.expenses.expenseTotal;
            state.expenses.data = action.payload.expenses.expensesData;
            state.incomes.total = action.payload.incomes.incomeTotal;
            state.incomes.data = action.payload.incomes.incomesData;
        },

        [getStatistics.rejected]: (state, action) => {
            message.error('Getting statistics error', `${action.payload.message}`, 'Ok');
        },
    },
});

export const { resetStatistics } = statisticsSlice.actions;

export default statisticsSlice.reducer;
