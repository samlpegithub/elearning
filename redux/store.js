'use client'
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./features/api/apiSlice"
import { authSlice } from "./features/auth/authSlice"


export const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authSlice.reducer


    },
    devTools:false,
    middleware:(getDefualtMiddleware)=>getDefualtMiddleware().concat(apiSlice.middleware)
})

//application can any load and refresh then call this logic
const initializeApp=async()=>{
//    await store.dispatch(apiSlice.endpoints.refreshToken.initiate({},{forceRefetch:true}))
   await store.dispatch(apiSlice.endpoints.loadUser.initiate({},{forceRefetch:true}));


}
initializeApp();



