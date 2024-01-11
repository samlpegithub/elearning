import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
        <footer>

    <div className='border border-[#0000000e] dark:border-[#ffffff1e]'/>
    <br />
    <div className=' w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto  sm:px-2 lg:px-8 '>
        <div className=' grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:text-left text-center '>
            <div className=' space-y-3'>
                <h1 className=' text-[20px] font-[600] text-black dark:text-white font-Josefin'>About </h1>
                <ul>
                    <li>
                        <Link href='/about' className='text-base text-black dark:text-gray-300 dark:hover:text-white '>Our Story</Link>
                    </li>
                    <li>
                        <Link href='/privacy-policy' className='text-base text-black dark:text-gray-300 dark:hover:text-white '>Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href='/faq' className='text-base text-black dark:text-gray-300 dark:hover:text-white '>FAQ</Link>
                    </li>

                </ul>
            </div>
            <div className=' space-y-3'>
                <h1 className=' text-[20px] font-[600] text-black dark:text-white font-Josefin'>Quick Links </h1>
                <ul>
                    <li>
                        <Link href='/courses' className='text-base text-black dark:text-gray-300 dark:hover:text-white '>Courses</Link>
                    </li>
                    <li>
                        <Link href='/profile' className='text-base text-black dark:text-gray-300 dark:hover:text-white '>My Accout</Link>
                    </li>
                    <li>
                        <Link href='/course-dashboard' className='text-base text-black dark:text-gray-300 dark:hover:text-white '>Course Dashboard</Link>
                    </li>
                    

                </ul>
            </div>
            <div className=' space-y-3'>
                <h1 className=' text-[20px] font-[600] text-black dark:text-white font-Josefin'>Social Links </h1>
                <ul>
                    <li>
                        <Link href='/youtube' className='text-base text-black dark:text-gray-300 dark:hover:text-white '>Youtube</Link>
                    </li>
                    <li>
                        <Link href='/instagram' className='text-base text-black dark:text-gray-300 dark:hover:text-white '>Instagram</Link>
                    </li>
                    <li>
                        <Link href='/github' className='text-base text-black dark:text-gray-300 dark:hover:text-white '>github</Link>
                    </li>
                    

                </ul>
            </div>
            <div className=' space-y-3 '>
                <h1 className=' text-[20px] font-[600] text-black dark:text-white font-Josefin'>Contact Info</h1>
                <ul className=' '>
                    <li>
                        <Link href='/phone' className='text-base text-black dark:text-gray-300 dark:hover:text-white '>Call Us:{" "} 03043502753</Link>
                    </li>
                    <li>
                        <Link href='/address' className='text-base text-black dark:text-gray-300 dark:hover:text-white '>Address:{" "} Faisal town near the knowledge school kanhna nau lahore </Link>
                    </li>
                    <li>
                        <Link href='/mailto:19497.awais@mao.edu.pk' className='text-base text-black dark:text-gray-300 dark:hover:text-white '>Mail Us: 19497.awais@mao.edu.pk</Link>
                    </li>
                    

                </ul>
            </div>
                
        </div>
            <p className=' text-black dark:text-white text-center py-3'>Copyright @ 2023 ELearning | All Rights Reserverd</p>
    </div>

        </footer>
  )
}

export default Footer