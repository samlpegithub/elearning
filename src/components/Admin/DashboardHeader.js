'use client'
import ThemeSwitcher from '../../app/utils/ThemeSwitcher';
import React, { useState } from 'react'
import {IoMdNotificationsOutline} from 'react-icons/io'
import { format } from 'timeago.js';
const DashboardHeader = () => {
    const [open, setopen] = useState(false);
  return (
    <div>
          <div className=' w-full flex items-center justify-end p-6 fixed top-5 right-0'>
      <ThemeSwitcher/>
      <div className="relative cursor-pointer m-2" onClick={()=>setopen(!open)}> 
        <IoMdNotificationsOutline className="text-2xl cursor-ponter dark:text-white text-black"/>
        <span className='absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[10px] 
        flex items-center justify-center text-white '>
          {/* {notification && notification.length} */}
          1
        </span>

      </div>
      {open &&(
      <div className=' w-[350px] h-[50vh] dark:bg-[#111c32] bg-white absolute top-16 z-10 rounded-lg'>
        <h5 className=' text-center text-[20px] font-Poppins text-black dark:text-white p-3'>
          Notifications
        </h5>
        
        {/* {notification && notification.map((item,index)=>( */}
          <div className=" dark:bg-[#2d3a4ea1] bg-[#00000013] !font-Poppins border-b-solid border-b dark:border-b-[#ffffff47]">
          <div className=" w-full flex items-center justify-between p-2">
            <p className='text-black dark:text-white'>
              New Order Reciveded!
            {/* {item.title} */}
            </p>
            <p className='text-black cursor-pointer first: dark:text-white'
            // onClick={()=>handleNotificationStatusChange(item._id)}
            >
              Mark as read 
            </p>
          </div>
          <p className=' px-2 text-black dark:text-white'>
           {/* {item.message} */}
           this is message reciveded from client to admin!
          </p>
          <p className='p-2 text-black dark:text-white text-[14px]'>
          {/* {format(item.createdAt)} */}
          {format('12/09/2023')}
          </p>
        </div>
        {/* ))} */}
       
       
      </div>)}

      
    </div>
    </div>
  )
}

export default DashboardHeader