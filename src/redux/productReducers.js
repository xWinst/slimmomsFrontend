import { createSlice } from '@reduxjs/toolkit';
import message from 'helpers/Message';
import { getAllProducts } from './productOperation';

const initialState = {
    allProducts: null,
    products: [],
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    // reducers: {
    //     resetStatistics: state => {
    //         state.expenses.total = null;
    //         state.expenses.data = null;
    //         state.incomes.total = null;
    //         state.incomes.data = null;
    //     },
    // },
    extraReducers: {
        [getAllProducts.fulfilled]: (state, action) => {
            state.allProducts = action.payload;
        },

        [getAllProducts.rejected]: (state, action) => {
            message.error('Getting allProducts error', `${action.payload.message}`, 'Ok');
        },
    },
});

// export const { resetStatistics } = statisticsSlice.actions;

export default productSlice.reducer;
