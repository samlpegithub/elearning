'use client'
import React, { useEffect, useState } from 'react'
import { styles } from '../../../app/styles/styles';
import { useEditHeroDataMutation, useGetHeroDataQuery } from '../../../../redux/features/layout/layoutApi';
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Loader from '@/components/Loader/Loader';

const EditCategories = () => {
    let {data,refetch,isLoading}=useGetHeroDataQuery("Categories",{refetchOnMountOrArgChange:true});

    let [editHeroData,{isSuccess,error}]=useEditHeroDataMutation();
    const [categories, setcategories] = useState([])
useEffect(()=>{
    if(data){
    setcategories(data?.layout?.categories);
    }
  
},[data]);
useEffect(()=>{
    if(isSuccess){
        refetch();
        toast.success("Categories Updated successfully");
    }
    if(error){
        toast.error(error.data.message);
    }

},[isSuccess,error])

const areCategoiresUnchange=(originalCategories,newCategories)=>{
 return JSON.stringify(originalCategories)===JSON.stringify(newCategories) ? true : false
}

const handleCategoriesAdd=(id,value)=>{
    // setcategories((prevCategories)=>{
    //     return prevCategories.map((c)=>{
    //      return  c._id===id ? {...c,title:value} : c});
    //     })
let data=categories.map((item)=>item._id===id ? {...categories,title:value}:item)    
setcategories(data);
}

const addnewCategories=()=>{
    if(categories[categories.length-1].title===""){
        toast.error('Category title cannot be empty');

    }else{
        setcategories([...categories,{title:""}]);
    }

}
const isCategoriesEmpty=(categories)=>{
    
    return  categories.some((c)=>c.title==="");
}

const editCategories=async()=>{
    if(!isCategoriesEmpty(categories) && !areCategoiresUnchange(data?.layout?.categories,categories)){
      await editHeroData({
            type:"Categories",
            categories
        })
    }

}
  return (
    <div>
      {isLoading?<Loader/>:(
            <div>
            <div className='mt-[50px] text-center !min-h-[80vh] '>
                <h1 className={'dark:text-white text-black 800px:text-[30px] text-[25px] font-Poppins font-[400] 800px:pt-[70px] '}>All Categories</h1>
                {categories && categories.map((item)=>{
                    return (
                        <div className='p-3'>
                            <div className=' flex items-center w-full justify-center'>
                                <input type="text"  value={item.title} className='bg-transparent !w-[unset]
                                dark:text-white text-black !border-none 
                            outline-none    text-[20px]' onChange={(e)=>handleCategoriesAdd(item._id,e.target.value)} placeholder='Enter categories title..'/>
                                <AiOutlineDelete className=' dark:text-white text-black text-[18px] cursor-pointer' onClick={()=>{
                                    return setcategories((prevCategories)=>{
                                        return prevCategories.filter((i)=>i._id!==item._id)
                                    })}}/>
    
                            </div> 
                            
                        </div>
                    )
                })}
    <br />
    <br />
    <div className=' w-full flex justify-center'>
    
    <IoMdAddCircleOutline className={`dark:text-white text-black text-[25px] cursor-pointer `} onClick={addnewCategories}/> 
    
    
    
            
    </div>
    
      </div>
      <div className=' w-full flex justify-end'>
        <button className={`${styles.button}  !w-[100px] !rounded-md !min-h-[40px] text-white bg-[#cccccc34] 
        ${ areCategoiresUnchange(data?.layout?.categories,categories) || isCategoriesEmpty(categories) ? " !cursor-not-allowed " : " !cursor-pointer !bg-[#42d383] "}`} 
        onClick={ areCategoiresUnchange(data?.layout?.categories,categories) ||isCategoriesEmpty(categories) ? ()=>null : editCategories}>Save</button>
    </div>
        </div>
      )}
    </div>
  )
}

export default EditCategories