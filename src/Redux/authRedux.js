import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
       currentUser : null,
       isFetching: false,
       error: false
    },
    reducers:{
        loginStart: (state)=>{
            state.isFetching=true;
        },
        loginSuccess: (state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        loginFailure: (state)=>{
            state.isFetching=false;
            state.error=true;
        },
        logoutSuccess:(state)=>{
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
        },
        updateStart: (state)=>{
            state.isFetching = true;
        },
        updateSuccess: (state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        updateFailure: (state)=>{
            state.isFetching = false;
            state.error = true
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess, updateStart, updateSuccess, updateFailure } = userSlice.actions;
export default userSlice.reducer;