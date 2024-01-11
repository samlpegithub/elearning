import { apiSlice } from "../api/apiSlice";


export const notificationApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllNotifications:builder.query({
           query:()=>({
            url:"get-all-notifications",
            method:"GET",
            credentials:"include"
           })
            
        }),
        updateNotificationStatus:builder.mutation({
           query:({id})=>({
            url:`/update-notification/${id}`,
            method:"PUT",
            credentials:"include"
           })
            
        })
    })
})

export const {useGetAllNotificationsQuery,useUpdateNotificationStatusMutation}=notificationApi