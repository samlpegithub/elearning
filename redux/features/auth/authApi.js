import { apiSlice } from "../api/apiSlice";
import { userLogOut, userLoggedIn, userRegistration } from "./authSlice";


export const authApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(data)=>({
                url:"registration",
                method:"POST",
                body:data,
                credentials:"include"
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
              try {
                const result=await queryFulfilled;
                dispatch(
                    userRegistration({
                        token:result.data.activationToken
                    })
                )
              } catch (error) {
                console.log(error);
              }
            } 
        }),
        activation:builder.mutation({
            query:({activation_token,activation_code})=>({
                url:"activate-user",
                method:"POST",
                body:{
                    activation_token,
                    activation_code
                }

            })
        }),
        login:builder.mutation({
            query:({email,password})=>({
                url:"login",
                method:"POST",
                body:{
                    email,
                    password
                },
                credentials:'include'

            }),
       
        async onQueryStarted(arg,{queryFulfilled,dispatch}){
          try {
            const result=await queryFulfilled;
            dispatch(
                userLoggedIn({
                    accessToken:result.data.accessToken,
                    user:result.data.user
                })
            )
          } catch (error) {
            console.log(error);
          }
        } 
    }),
    socialAuth:builder.mutation({
        query:({name,email,avatar})=>({
            url:"social-auth",
            method:"POST",
            body:{
                name,
                email,
                avatar
            },
            credentials:'include'

        }),
   
    async onQueryStarted(arg,{queryFulfilled,dispatch}){
      try {
        const result=await queryFulfilled;
        dispatch(
            userLoggedIn({
                accessToken:result.data.accessToken,
                user:result.data.user
            })
        )
      } catch (error) {
        console.log(error);
      }
    } 
}),
    
        logOut:builder.query({
            query:()=>({
                url:"logout",
                method:"GET",
                credentials:'include'

            }),
       
        async onQueryStarted(arg,{queryFulfilled,dispatch}){
          try {
            dispatch(
                userLogOut()
            )
          } catch (error) {
            console.log(error);
          }
        } 
    }),
     
    })
})
export const {useRegisterMutation,useActivationMutation,useLoginMutation,useSocialAuthMutation,useLogOutQuery}=authApi