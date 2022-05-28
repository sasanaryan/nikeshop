import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        isFatching:false,
        error:false,
    },
    reducers:{
        Start:(state)=>{
            state.isFatching = true;
            state.error = false;
        },
        loginSuccess:(state,action)=>{
            state.isFatching  = false; 
            state.currentUser = action.payload;
        },
        Failure:(state)=>{
            state.isFatching =  false;
            state.error =  true;
        },
        logout:(state)=>{
            state.currentUser=null;
            state.isFatching =  false;
            state.error =  false;
        },
        
    },
});

export const {Start,loginSuccess,Failure ,logout} = userSlice.actions;
export default userSlice.reducer;