'use client'
import React from 'react'
import Heading from '../../utils/Heading'
import DashbaordHeader from '../../../components/Admin/DashboardHeader'
import AdminSidebar from '../../../components/Admin/Sidbar/AdminSidebar'
import AllInvoices from '../../../components/Admin/Order/AllInovices'

const page = () => {
  return (
    <div className=' '>
       <Heading title={`ELearning - Admin`} 
      description="ELearing is a platform fot student to learn and get help from teachers"
      keywords="Programming,MERN Stack,Machine Learning,Redux Store "
      />

      <DashbaordHeader/>
      <div className='flex'>

    <div className=" 1500px:w-[16%] w-1/4  mt-0 ">
     <AdminSidebar/>
  
    </div>
    <div className="w-[85%]">
      <AllInvoices/>
    </div>
    
      </div>
    </div>
  )
}

export default page
