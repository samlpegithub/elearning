'use client'
import React from 'react'
import Image from 'next/image'
import Ratings from '@/app/utils/Ratings'
const ReviewCard = (props) => {
  return (
    <div className="w-full  pb-4 h-max dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-lg dark:shadow-inner">
      <div className=' 800px:flex w-full justify-between '>
        <Image src={props.item.avatar} alt='avatar' className='w-[50px] h-[50px] rounded-full object-cover' width={50} height={50} />

      {/* only for laptop scren */}
        <div className='800px:flex justify-between w-full hidden'>

          <div className=' pl-4'>
            <h1 className=' text-[20px] text-black dark:text-white'>
              {props.item.name}
            </h1>
            <h1 className=' text-[16px] text-black dark:text-white'>
              {props.item.professtional}
            </h1>

          </div>
          <Ratings rating={props.item.ratings} />
        </div>
     
     {/* only for mobile screen */}
        <div className="800px:hidden justify-between w-full flex">
        <div className=' pl-4'>
            <h1 className=' text-[20px] text-black dark:text-white'>
              {props.item.name}
            </h1>
            {/* <h1 className=' text-[16px] text-black dark:text-white'>
              {props.item.professtional}
            </h1> */}
          </div>
          <Ratings rating={props.item.ratings} />

        </div>
      </div>
      <p className=' pt-2 px-2 font-Poppins text-black dark:text-white text-justify'>
        {props.item.comments}
      </p>

    </div>
  )
}

export default ReviewCard