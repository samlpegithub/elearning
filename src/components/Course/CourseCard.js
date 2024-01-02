import Ratings from '@/app/utils/Ratings';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai';

const CourseCard = ({item,isProfile}) => {
  return (
  <div>
    <Link href={!isProfile?`/course/${item._id}`:`course-access/${item._id}`}>
        <div className=' w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-md dark:shadow-inner'>
            <Image src={item?.thumbnail?.url}
            alt='' width={300} height={300} className=" !w-[400px] !h-[250px] rounded "
            objectFit='contain'
            />
            <br />
            <h1 className='font-Poppins text-[16px] text-black dark:text-white'>{item?.name}</h1>
            <div className=' w-full flex items-center justify-between pt-2'>
                <Ratings rating={item.ratings}/>
                <h5 className={` text-black dark:text-white ${isProfile && "hidden 800px:inline"}`}>
                    {item.purchased} Student
                </h5>
            </div>
            
            <div className='w-full flex items-center justify-between pt-2'>
            <div className='flex '>
                <h1 className=' text-black dark:text-white'>
                    {item.price ===0?"Free":item.price+"$"}
                </h1>
                <h1 className=' text-black dark:text-white pl-3 text-[14px] mt-[-5px] line-through opacity-80 '>
                    {item.estimatedPrice}$
                </h1>
            </div>
            <div className=' flex items-center pb-3'>
                <AiOutlineUnorderedList size={20} className=' text-black dark:text-white '/>
                <h5 className='pl-2 text-black dark:text-white '>{item?.courseData?.length} Lectures</h5>
            </div>
            </div>
            

        </div>
    </Link>
  </div>
    )
}

export default CourseCard