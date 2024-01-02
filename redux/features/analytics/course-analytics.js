import { apiSlice } from "../api/apiSlice";

export const analyticsApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getCourseAnalytics:builder.query({
          query:()=>({
            url:"get-courses-analytics",
            method:"GET",
            credentials:'include'
          })
        }),
        getOrdersAnalytics:builder.query({
          query:()=>({
            url:"get-orders-analytics",
            method:"GET",
            credentials:'include'
          })
        }),
        getUsersAnalytics:builder.query({
          query:()=>({
            url:"get-users-analytics",
            method:"GET",
            credentials:'include'
          })
        })
    })
})


export const {useGetCourseAnalyticsQuery,useGetOrdersAnalyticsQuery,useGetUsersAnalyticsQuery}=analyticsApi