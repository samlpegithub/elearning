'use client'
import React from 'react'
import AdminSidebar from '../../../components/Admin/Sidbar/AdminSidebar'
import Heading from '../../utils/Heading'
import DashboardHeader from '../../../components/Admin/DashboardHeader'
import AllUsers from  '../../../components/Admin/Users/AllUser.js'
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
          <div className='w-[82%]'>
            <AllUsers/>
        </div>
        </div>

    </div>
  )
}

export default page