import { createSlice } from '@reduxjs/toolkit';
import message from 'helpers/Message';
import {
    add,
    getUserProducts,
    deleteUserProducts,
    updateWeight,
    getReports,
} from './productOperation';
import allProduct from 'db/allProducts.json';

const initialState = {
    allProducts: allProduct,
    products: null,
    date: null,
    consumed: 0,
    reports: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        chooseDate: (state, action) => {
            state.date = action.payload;
        },
    },
    extraReducers: {
        [add.fulfilled]: (state, action) => {
            state.products = action.payload.products;
            state.consumed = action.payload.consumed;
        },

        [add.rejected]: (state, action) => {
            message.error(
                'Product add error',
                `${action.payload.message}`,
                'Ok'
            );
        },

        [getUserProducts.fulfilled]: (state, action) => {
            const { products, consumed } = action.payload;
            state.products = products;
            state.consumed = consumed;
        },

        [getUserProducts.rejected]: (state, action) => {
            message.error(
                'Getting UserProducts error',
                `${action.payload.message}`,
                'Ok'
            );
        },

        [deleteUserProducts.fulfilled]: (state, action) => {
            state.products = action.payload.products;
            state.consumed = action.payload.consumed;
        },

        [deleteUserProducts.rejected]: (state, action) => {
            message.error(
                'Deleted UserProducts error',
                `${action.payload.message}`,
                'Ok'
            );
        },

        [updateWeight.rejected]: (state, action) => {
            message.error(
                'Update weight  error',
                `${action.payload.message}`,
                'Ok'
            );
        },

        [getReports.fulfilled]: (state, action) => {
            state.reports = action.payload;
        },

        [getReports.rejected]: (state, action) => {
            message.error(
                'Get reports error',
                `${action.payload.message}`,
                'Ok'
            );
        },
    },
});

export const { chooseDate } = productSlice.actions;

export default productSlice.reducer;
