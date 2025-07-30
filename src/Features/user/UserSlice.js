import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    status: 'idle',
    auth: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setAuth(state) {
            state.auth = true;
        },
        clearAuth(state) {
            state.auth = false;
        },
    },
});

export const { setUser, clearUser, setStatus, setAuth, clearAuth } = userSlice.actions;
export default userSlice;