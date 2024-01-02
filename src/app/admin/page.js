'use client'
import React from 'react'
import AdminSidebar from '../../components/Admin/Sidbar/AdminSidebar.js'
import Heading from '../utils/Heading.js'
import { AdminProtected } from '../hooks/adminProtected'
import DashboardHero from '../../components/Admin/DashboardHero'
const page = () => {
  return (
    <div>
      <AdminProtected>
      <Heading title="ELearning - Admin" 
      description="ELearing is a platform fot student to learn and get help from teachers"
      keywords="Programming,MERN Stack,Machine Learning,Redux Store "
      />
      <div className='flex h-[200vh]'>
        <div className=' 1500px:w-[16%] w-1/6 mt-0 '>
            <AdminSidebar/>
        </div>
        <div className='w-[85%]'>
            <DashboardHero/>
        </div>
      </div>
      </AdminProtected>
    </div>
  )
}

export default page