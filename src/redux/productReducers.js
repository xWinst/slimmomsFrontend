import { createSlice } from '@reduxjs/toolkit';
import message from 'helpers/Message';
import {
    getAllProducts,
    add,
    getUserProducts,
    deleteUserProducts,
} from './productOperation';

const initialState = {
    allProducts: null,
    products: null,
    date: null,
    consumed: null,
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
        [getAllProducts.fulfilled]: (state, action) => {
            state.allProducts = action.payload;
        },

        [getAllProducts.rejected]: (state, action) => {
            message.error(
                'Getting allProducts error',
                `${action.payload.message}`,
                'Ok'
            );
        },

        [add.fulfilled]: (state, action) => {
            state.products.push(action.payload);
            // console.log('action.payload: ', action.payload);
        },

        [add.rejected]: (state, action) => {
            message.error(
                'Product add error',
                `${action.payload.message}`,
                'Ok'
            );
        },

        [getUserProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
            let result = 0;
            action.payload.forEach(product => {
                result += product.calories;
            });
            state.consumed = result;
        },

        [getUserProducts.rejected]: (state, action) => {
            message.error(
                'Getting UserProducts error',
                `${action.payload.message}`,
                'Ok'
            );
        },

        [deleteUserProducts.fulfilled]: (state, action) => {
            state.products = state.products.filter(
                product => product._id !== action.payload
            );
            let result = 0;
            action.payload.forEach(product => {
                result += product.calories;
            });
            state.consumed = result;
        },

        [deleteUserProducts.rejected]: (state, action) => {
            message.error(
                'Getting UserProducts error',
                `${action.payload.message}`,
                'Ok'
            );
        },
    },
});

export const { chooseDate } = productSlice.actions;

export default productSlice.reducer;
