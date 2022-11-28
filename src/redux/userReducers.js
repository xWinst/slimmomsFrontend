import { createSlice } from '@reduxjs/toolkit';
import message from 'helpers/Message';
import {
    logIn,
    logOut,
    registration,
    refresh,
    getUser,
    setDailyRate,
} from './userOperations';

const initialState = {
    isLoading: true,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    userData: null,
};
const userSlice = createSlice({
    name: 'user',
    initialState,

    extraReducers: {
        [registration.pending]: state => {
            state.isLoading = true;
        },
        [registration.fulfilled]: state => {
            state.isLoading = false;
            message.sucsess('Registration was completed successfully');
        },
        [registration.rejected]: (state, action) => {
            state.isLoading = false;
            message.error(
                'Registration error',
                `${action.payload.message}`,
                'Ok'
            );
        },

        [logIn.pending]: state => {
            state.isLoading = true;
        },
        [logIn.fulfilled]: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userData = action.payload.user;
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        [logIn.rejected]: (state, action) => {
            state.isLoading = false;
            message.error('LogIn error', `${action.payload.message}`, 'Ok');
        },
        [logOut.fulfilled]: state => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.userData = null;
        },
        [logOut.rejected]: (state, action) => {
            message.error('LogOut error', `${action.payload.message}`, 'Ok');
        },
        [refresh.pending]: state => {
            state.isLoading = true;
        },
        [refresh.fulfilled]: (state, action) => {
            state.refreshToken = action.payload.refreshToken;
            // state.isLoading = false;
        },
        [refresh.rejected]: (state, action) => {
            state.isLoading = false;
            console.log('refresh error: ', action.payload);
        },
        [getUser.pending]: state => {
            state.isLoading = true;
        },
        [getUser.fulfilled]: (state, action) => {
            state.userData = action.payload;
            state.isLoading = false;
            state.isLoggedIn = true;
        },
        [getUser.rejected]: (state, action) => {
            state.isLoading = false;
            console.log('getUser error: ', action.payload);
        },

        [setDailyRate.fulfilled]: (state, action) => {
            state.userData.dailyRate = action.payload;
        },
        [setDailyRate.rejected]: (state, action) => {
            console.log('refresh error: ', action.payload);
        },
    },
});

export default userSlice.reducer;
