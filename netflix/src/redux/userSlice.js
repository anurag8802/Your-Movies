import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        isLoading:false,
        subscriptionStatus: false // false = not subscribed, true = subscribed
    },
    reducers:{
        // actions
        setUser:(state,action)=>{
            state.user = action.payload;
        },
        setLoading:(state,action)=>{
            state.isLoading = action.payload;
        },
        setSubscriptionStatus: (state, action) => {
            state.subscriptionStatus = action.payload;
        }
    }
});
export const {setUser,setLoading,setSubscriptionStatus} = userSlice.actions;
export default userSlice.reducer;