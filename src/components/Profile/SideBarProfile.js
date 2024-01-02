import Image from 'next/image'
import React from 'react'
import {RiLockPasswordLine} from 'react-icons/ri'
import {SiCoursera} from 'react-icons/si'
import avatarDefult from '../../../public/avatar.jpg'
import {FiLogOut} from 'react-icons/fi'
import {MdOutlineAdminPanelSettings} from 'react-icons/md'
import Link from 'next/link'
const SideBarProfile = ({user,avatar,active,logoutHandler,setactive}) => {
  return (
    <div className='w-full'>
        <div className={`w-full flex items-center px-3 py-3 cursor-pointer ${active===1?"bg-slate-100 dark:bg-slate-800":"bg-transparent"}` } onClick={()=>setactive(1)}>
            <Image src={user.avatar|| avatar ? user.avatar.url || avatar :avatarDefult}
            width={25} height={25}
            alt='avatar'
            className='w-[25px] h-[25px] 800px:w-[35px] 800px:h-[35px] cursor-pointer rounded-full
            border-[3px] border-solid border-[#37a39a]'
            />
            <h5 className='pl-2 800px:block hidden text-black dark:text-white font-Poppins'>My Account</h5>
        </div>
        <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active===2?"bg-slate-100 dark:bg-slate-800":"bg-transparent"}` } onClick={()=>setactive(2)}>
            <RiLockPasswordLine size={20}  className=' 800px:ml-2 text-black dark:text-white'/>
            <h5 className='pl-2 800px:block hidden text-black dark:text-white font-Poppins'>Change Password</h5>
        </div>
        <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active===3?"bg-slate-100 dark:bg-slate-800":"bg-transparent"}` } onClick={()=>setactive(3)}>
            <SiCoursera size={20}  className=' 800px:ml-2 text-black dark:text-white'/>
            <h5 className='pl-2 800px:block hidden text-black dark:text-white font-Poppins'>Enrolled Courses</h5>
        </div>
       {user.role==='admin' && <Link href='/admin'>
       <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active===5?"bg-slate-100 dark:bg-slate-800":"bg-transparent"}` } onClick={()=>setactive(5)}>
            <MdOutlineAdminPanelSettings size={20}  className=' 800px:ml-2 text-black dark:text-white'/>
            <h5 className='pl-2 800px:block hidden text-black dark:text-white font-Poppins'>Admin Dashboard</h5>
        </div>
       </Link>}
        <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active===4?"bg-slate-100 dark:bg-slate-800":"bg-transparent"}` } onClick={()=>logoutHandler()}>
            <FiLogOut size={20}  className=' 800px:ml-2 text-black dark:text-white'/>
            <h5 className='pl-2 800px:block hidden text-black dark:text-white font-Poppins'>Log Out</h5>
        </div>

    </div>
  )
}

export default SideBarProfile