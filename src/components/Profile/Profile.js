'use client'
import React, { useEffect, useState } from 'react'
import SideBarProfile from './SideBarProfile.js'
import { useLogOutQuery } from '../../../redux/features/auth/authApi.js';
import { signOut } from 'next-auth/react';
import ProfileInfo from './ProfileInfo.js'
import ChangePassword from './ChangePassword'
import CourseCard from '../Course/CourseCard.js';
import { useGetUserAllCoursesQuery } from '../../../redux/features/courses/courseApi.js';
const Profile = ({ user }) => {
  const [scroll, setscroll] = useState(false);
  const [active, setactive] = useState(1);
  const [avatar, setavatar] = useState(null);
  const [logout, setlogout] = useState(false);
  const [course, setcourse] = useState([])

  let { data, isLoading } = useGetUserAllCoursesQuery(undefined, {})

  const { } = useLogOutQuery(undefined, { skip: !logout ? true : false });


  if (typeof window !== undefined) {
    window.addEventListener('scroll', () => {
      if (window.screenY > 85) {
        setscroll(true)
      } else {

        setscroll(false);

      }
    })

  }

  const logoutHandler = async () => {
    setlogout(true);
    await signOut();

  }
  useEffect(() => {
    if (data) {
      const filtercourse = user.courses.map((usercourse) => data.courses.find((course) => course._id === usercourse._id)).filter((course)=>course!==undefined);
      setcourse(filtercourse);
    }


  }, [data,user])

  return (
    <div className='w-[90%]  flex mx-auto '>
      <div className={`w-[60px] 800px:w-[310px] h-[450px] bg-opacity-90 bg-white dark:bg-slate-900 border 
        dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-lg dark:shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? " top-[120px]" : "top-[30px]"} left-[30] `}>
        <SideBarProfile
          user={user}
          active={active}
          setactive={setactive}
          avatar={avatar}
          logoutHandler={logoutHandler}


        />
      </div>
     < >
     {active === 1 && <div className='w-full h-full bg-transparent mt-[80px]'><ProfileInfo user={user} avatar={avatar} /></div>}
      {active === 2 && <div className='w-full h-full bg-transparent mt-[80px]'><ChangePassword /></div>}
      {active === 3 && (
        <div className=' w-full  pl-4   mt-[80px] '>
          <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-3  '>
            {course && course.map((item, index) => (
              <CourseCard item={item} key={index} user={user} />
            ))}
            {course.length === 0 && (
              <div className=' justify-center min-h-[50vh] flex items-center '>
                <h1 className='text-center  text-[18px] font-Poppins  text-black dark:text-white'>
                  You don't any purchased course!
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
     </>
    </div>
  )
}

export default Profile