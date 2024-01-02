'use client'
import React from 'react'
import AdminSidebar from '../../../components/Admin/Sidbar/AdminSidebar'
import Heading from '../../utils/Heading'
import CreateCourse from '../../../components/Admin/Course/CreateCourse'
import DashboardHeader from '../../../components/Admin/DashboardHeader'
const page = () => {
  return (
    <div>
     <Heading title="ELearning - Admin" 
      description="ELearing is a platform fot student to learn and get help from teachers"
      keywords="Programming,MERN Stack,Machine Learning,Redux Store "
      />
      <DashboardHeader/>
       <div className='flex'>
        <div className=' 1500px:w-[16%] w-1/6 mt-0 '>
          <AdminSidebar/>
          </div>
          <div className='w-[85%]'>
            <CreateCourse/>
        </div>
        </div>

    </div>
  )
}

export default page