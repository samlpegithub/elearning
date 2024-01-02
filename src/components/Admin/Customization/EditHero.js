'use client'
import React,{useState,useEffect} from 'react'
import { useEditHeroDataMutation, useGetHeroDataQuery } from '../../../../redux/features/layout/layoutApi'
import { AiOutlineCamera } from 'react-icons/ai'
import toast from 'react-hot-toast'

const EditHero = () => {
    let [image,setImage]=useState("")
    let [title,setTitle]=useState("")
    let [subTitle,setSubTitle]=useState("")
  let {data,refetch}=useGetHeroDataQuery("Banner",{refetchOnMountOrArgChange:true});
  let [editHeroData,{isSuccess,error}]=useEditHeroDataMutation();
  useEffect(()=>{
if(data){
  setImage(data?.layout?.banner?.image?.url);
    setTitle(data?.layout?.banner?.title);
    setSubTitle(data?.layout?.banner?.subTitle);
  }
  },[data])
  useEffect(()=>{
    if(isSuccess){
      refetch();
      toast.success('Hero Updated successfully');
    }
    if(error){
      toast.error(error.data.message);
    }
  },[isSuccess,error])
  const handleUpdate=(e)=>{
      
    
    const fileReader=new FileReader();
    fileReader.onload=async()=>{
        if(fileReader.readyState===2){
        const image=fileReader.result;
        setImage(image);
        }
    }
    fileReader.readAsDataURL(e.target.files[0]);
    
      }
      const handleEdit=async()=>{
        console.log(subTitle);

        await editHeroData({
          type:"Banner",
          image,
          title,
          subTitle,
    
        })
     
      }
  return (
    <div className='w-full 1000px:flex items-center   1000px:pb-[200px] pb-[500px]   '> 
    <div className='relative top-[50px] 800px:left-[20px]  1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px] 1100px:w-[500px] h-[65vh] w-full hero_animation  rounded-full'>

      <div className='absolute flex items-center pt-[50px] pl-[20px] 800px:pl-0 800px:pt-[90px]  '>
        <img src={image} alt=""  className='object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]'/>
        <input type="file" className='hidden' name='' id='banner' accept='image/*'  
        onChange={handleUpdate}  />
        <label htmlFor="banner" className=' absolute bottom-0 right-10  z-20'  >
          <AiOutlineCamera className=' dark:text-white text-black text-[18px] cursor-pointer' />
        </label>
      </div>
      </div>
    
             

  <div className='1000px:w-[60%]  800px:pl-6 w-full  justify-end  flex flex-col items-center  text-center  relative 800px:top-[100px] top-[70px]  800px:pr-20     800px:text-left '>
        
        <textarea className=' text-[#000000c7]  !h-auto  dark:text-white resize-none text-[30px] bg-transparent text-center     w-full 1000px:text-[50px] 1500px:text-[70px] font-[600]  focus:border-none focus:outline-none' rows={4} placeholder=' Improve Your Online Learning Experience Better Instantly' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <br />
        
        <textarea  value={subTitle} onChange={(e)=>setSubTitle(e.target.value)}
        placceholder="we have 40k+ Online courses & 50k+ Online registered students .Find your desired Courses from theme "
        className=' dark:text-[#edfff4] text-[#00000c] text-center   font-Josefin font-[600] 1000px:-ml-[70px]   text-[18px] 1500px:w-[55%] 1100px:w-[80%]  w-full 1000px:h-[150px] h-[100px] bg-transparent focus:border-none focus:outline-none'/>
        <br />
        <br />
        <br />
        <div className='w-full  flex justify-end  '>
                     
    <button 
    className={` font-Poppins rounded-md !w-[100px]   !min-h-[40px] dark:text-white text-black bg-[#cccccc34] 
    ${ data?.layout?.banner?.title!==title || data?.layout?.banner?.subTitle!==subTitle || data?.layout?.banner?.image?.url!==image? "!cursor-pointer !bg-[#42d383]":"!cursor-not-allowed"} `}
               onClick={
                 data?.layout?.banner?.title!==title || data?.layout?.banner?.subTitle!==subTitle || data?.layout?.banner?.image?.url!==image? handleEdit :()=>null}
                  >
              Save
        </button>
    </div>
      </div>
      
        </div>
  )
}

export default EditHero