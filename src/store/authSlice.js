import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,     // user is not logged in
    userData: null       // no user information
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // login reducer
        login: (state,action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        // logout reducer
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login,logout} = authSlice.actions;


export default authSlice.reducer;