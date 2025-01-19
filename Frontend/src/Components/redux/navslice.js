import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{isloogedIn:false,role:'user'},
    reducers:{
        login(state){
            state.isloogedIn = true
        },
        logout(state){
            state.isloogedIn = true
        },
        userrole(state,action){
            state.role = action.payload
        }
    }
})
export const Authactions = authSlice.actions
export default authSlice.reducer