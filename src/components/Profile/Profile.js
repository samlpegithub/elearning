'use client'
import React, { useState } from 'react'
import SideBarProfile from './SideBarProfile.js'
import { useLogOutQuery } from '../../../redux/features/auth/authApi.js';
import { signOut } from 'next-auth/react';
import ProfileInfo from './ProfileInfo.js'
import  ChangePassword from './ChangePassword'
const Profile = ({user}) => {
    const [scroll, setscroll] = useState(false);
    const [active, setactive] = useState(1);
    const [avatar, setavatar] = useState(null);
const [logout, setlogout] = useState(false);
     if(typeof window !==undefined){
       window.addEventListener('scroll',()=>{
        if(window.screenY > 85){
            setscroll(true)
        }else{

            setscroll(false);

        }
       })

    }
    useLogOutQuery(undefined,{skip:!logout? true:false});
    const logoutHandler=async()=>{
      setlogout(true);
     await signOut();

    }
  return (
    <div className='w-[85%] flex mx-auto'>
        <div className={`w-[60px] 800px:w-[310px] h-[450px] bg-opacity-90 bg-white dark:bg-slate-900 border 
        dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-lg dark:shadow-sm mt-[80px] mb-[80px] sticky ${scroll?" top-[120px]":"top-[30px]"} left-[30] `}>
            <SideBarProfile
            user={user}
            active={active}
            setactive={setactive}
            avatar={avatar}
            logoutHandler={logoutHandler}

            
            />
        </div>
        {active===1 &&<div className='w-full h-full bg-transparent mt-[80px]'><ProfileInfo user={user} avatar={avatar}/></div>}
        {active===2 &&<div className='w-full h-full bg-transparent mt-[80px]'><ChangePassword  /></div>}
    </div>
  )
}

export default Profile