import {apiSlice} from '../api/apiSlice'
export const courseApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createCourse:builder.mutation({
            query:(data)=>({
                url:"create-course",
                method:"POST",
                body:data,
                credentials:"include"


            })
        }),
        getAllCourses:builder.query({
            query:()=>({
                url:"getAdminAllcourses",
                method:"GET",
                credentials:"include"
            })
        }),
        deleteCourse:builder.mutation({
            query:({id})=>({
                url:`delete-course/${id}`,
                method:"DELETE",
                credentials:"include"
            })
        }),
        editCourse:builder.mutation({
            query:({id,data})=>({
                url:`edit-course/${id}`,
                method:"PUT",
                body:data,
                credentials:"include"
            })
        }),
        getUserAllCourses:builder.query({
            query:()=>({
                url:`get-courses`,
                method:"GET",
                credentials:"include"
            })
        }),
        getCourseDetail:builder.query({
            query:(id)=>({
                url:`get-course/${id}`,
                method:"GET",
                credentials:"include"
            })
        })
    })
})


export const {useCreateCourseMutation,useGetAllCoursesQuery,useDeleteCourseMutation,useEditCourseMutation,useGetUserAllCoursesQuery,useGetCourseDetailQuery}=courseApi