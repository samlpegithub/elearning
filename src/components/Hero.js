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
import { useRouter } from 'next/navigation'
const Hero = () => {
const [search, setSearch] = useState("")
let router=useRouter();
let {data,isLoading}=useGetHeroDataQuery("Banner",{})  

const handleSearch=()=>{
if(search===""){
  return;
}else{
  router.push(`/courses?title=${search}`);
}
} 
  
    return (
    <div>
      {isLoading ? (
        <Loader/>
      ):(
            <div className=' w-full 1000px:flex items-center justify-between 800px:pb-[100px] !pb-[50px] 800px:pl-[20px]'>
              <div className=' !mt-[50px] 800px:left-[20px]  1500px:h-[700px] 1500px:w-[700px] 1100px:h-[480px] 1100px:w-[480px] h-[75vh] w-[90%] hero_animation rounded-full '>
                <div className='flex 1000px:min-h-[90vh] min-h-[70vh] items-center justify-end z-10'>
                  <img src={data?.layout?.banner?.image?.url}
                  
                  alt='banner'
                  className=' object-contain 1100px:max-w-[90%] 1500px:w-[85%]  z-10'
                  />
                  </div>
                </div>

                <div className="1000px:w-[60%] flex flex-col item-center 800px:pl-[50px]  1000px:text-left  800px:px-0 px-2 text-center ">
                  
                  <h2 className='dark:text-white text-[#000000c7] text-[30px]  w-full 1000px:text-[70px] font-[500] font-Josefin py-2 1000px:leading-[75px] '>
                  {data?.layout?.banner?.title}
                  </h2>
                  <h1 
     className=' dark:text-[#edfff4] text-[#00000c]  font-Josefin font-[600]  text-[18px] 1500px:w-[55%] 1100px:w-[85%]   w-full bg-transparent  800px:pt-5'>{data?.layout?.banner?.subTitle}</h1>
     <>

     <div className=" relative 1100px:w-[80%] w-[90%] h-[50px] bg-transparent  top-[20px]  ">
       <input type="search" placeholder='Search Courses...'
       className=' bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] font-Poppins p-2 w-full h-full outline-none  dark:text-white text-black' 
       value={search}
       onChange={(e)=>setSearch(e.target.value)}
       />
      <div className=' absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]' onClick={handleSearch}>
           <BiSearch size={30} className={'dark:text-white text-black'}/>
       </div>
       </div>
       </>
       <br />
       <br />
       <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center  800px:mt-[-10px]'>
           <Image src={Client1} alt='' className=' rounded-full '/>
           <Image src={Client2} alt='' className=' rounded-full ml-[-20px]'/>
           <Image src={Client3} alt='' className=' rounded-full ml-[-20px]'/>
           <p className=' font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] pl-1 font-[600]'>
               500k+ People already trusted us.
           <Link href='/courses' className="dark:text-[#46e256] pl-1 font-[600] text-[crimson] inline-block  text-start"> View Courses</Link>
            </p>
            </div>


                </div>



            
            
            </div> 
      )}
  
    </div>
  )
}
export default Hero
