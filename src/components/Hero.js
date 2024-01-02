import Image from 'next/image'
import React, { use, useState } from 'react'
// import banner from '../../public/banner.webp'
import Client1 from '../../public/client-1.jpg'
import Client2 from '../../public/client-2.jpg'
import Client3 from '../../public/client-3.jpg'
import { BiSearch } from 'react-icons/bi'
import Link from 'next/link'
import { useGetHeroDataQuery } from '../../redux/features/layout/layoutApi'
import Loader from './Loader/Loader'
const Hero = () => {
const [search, setSearch] = useState("")
const handleSearch=()=>{

} 
      let {data,isLoading}=useGetHeroDataQuery("Banner",{})  
  
    return (
    <div>
      {isLoading ? (
        <Loader/>
      ):(
            <div className='w-full 1000px:flex items-center    1000px:pb-[200px] pb-[500px] '> 

            <div className='relative top-[50px] 800px:left-[20px]  1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px] 1100px:w-[500px] h-[60vh] w-[90%] hero_animation  rounded-full '>
              <div className='absolute flex items-center pt-[50px]   800px:pl-0 800px:pt-[90px]   '>
            <img src={data?.layout?.banner?.image?.url} alt=""  className='object-contain  1100px:max-w-[90%]  800px:pl-10  w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]'></img>
                
               
              </div>
            
            </div>          
            
            <div className='1000px:w-[60%]  800px:pl-6 w-full justify-center  flex flex-col items-center   800px:text-center  relative 800px:top-[60px] top-[70px] text-start   '>
                
                <h1 className=' text-[#000000c7]    dark:text-white  text-[30px] bg-transparent   px-3 w-full 1000px:text-[50px] 1500px:text-[70px] font-[700]  '  >{data?.layout?.banner?.title}</h1>
                <br />
                
                <h1 
                className=' dark:text-[#edfff4] text-[#00000c] relative 800px:left-[-10px]  font-Josefin font-[600]  text-[18px] 1500px:w-[55%] 1100px:w-[80%]  w-full bg-transparent '>{data?.layout?.banner?.subTitle}</h1>
                <br />
                <br />
                <br />
             
              <div className="1500px: 1100px:w-[70%] w-[90%] h-[50px] bg-transparent relative 800px:top-[-35px] 800px:left-[-50px] ">
                  <input type="search" placeholder='Search Courses...'
                  className=' bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] font-Poppins p-2 w-full h-full outline-none  dark:text-white text-black' 
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                  />
                  <div className=' absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]' onClick={handleSearch}>
                      <BiSearch size={30} className={'dark:text-white text-black'}/>
                  </div>
              </div>
            
                  <br />
                  <br />
                  <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center ml-[-10px] 800px:mt-[-50px]'>
                      <Image src={Client1} alt='' className=' rounded-full '/>
                      <Image src={Client2} alt='' className=' rounded-full ml-[-20px]'/>
                      <Image src={Client3} alt='' className=' rounded-full ml-[-20px]'/>
                      <p className=' font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] pl-1 font-[600]'>
                          500k+ People already trusted us.
                      <Link href='/courses' className="dark:text-[#46e256] pl-1 font-[600] text-[crimson] inline-block  text-start">
                          View Courses
                       
                          
                                           </Link>
                      </p>
                  </div>
            
            
              </div>
                </div>
      )}
  
    </div>
  )
}
export default Hero
