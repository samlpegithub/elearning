'use client'
import React, { useEffect } from 'react'
import { useLoadUserQuery } from '../../../../redux/features/api/apiSlice';
import Loader from '@/components/Loader/Loader';
import { redirect } from 'next/navigation';
import CourseContent from '../../../components/Course/CourseContent'
const page = ({params}) => {
    const id=params.id;
    let {data,isLoading,error}=useLoadUserQuery({});

    useEffect(()=>{
        if(data){
        const isPurchased=data && data.user.courses.find((item)=>item._id===id);
        if(!isPurchased){
            redirect('/');
        }
        if(error){
            redirect('/');
        }
        }
        
},[data])
  return (
    <div className=' w-full h-full'>
         {isLoading?<Loader/>:
         <CourseContent id={id} user={data && data.user}/>
        }
       
    </div>
  )
}

export default page