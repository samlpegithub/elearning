'use client'
import { useGetHeroDataQuery } from '../../../../redux/features/layout/layoutApi';
import { styles } from '../../../app/styles/styles';
import React, { useEffect, useState } from 'react'

const CourseInformation = (props) => {
  const {active,setactive,courseInfo,setCourseInfo,}=props;
  const [dragging, setDragging] = useState(false);
 const [categories, setcategories] = useState([]);

 let {data}=useGetHeroDataQuery("Categories",{});

useEffect(()=>{
if(data){
console.log(data);
  setcategories(data?.layout?.categories);
}
},[data])

  const handleSubmit=(e)=>{
    e.preventDefault();
    setactive(active+1);
  }
  
  const handleFileChange=(e)=>{
    let fileReader=new FileReader();
   fileReader.onload=()=>{
    if(fileReader.readyState===2){
      setCourseInfo({...courseInfo,thumbnail:fileReader.result})
      console.log(courseInfo.thumbnail);
    }
   }
    fileReader.readAsDataURL(e.target.files[0]);

  }

  const handleDragOver=(e)=>{
    e.preventDefault();
    setDragging(true);
  }

  const handleDragLeaver=(e)=>{
    e.preventDefault();
    setDragging(false);
  }

  const handleDrop=(e)=>{
    e.preventDefault();
    setDragging(false);

    let fileReader=new FileReader();
    fileReader.onload=()=>{
     if(fileReader.readyState===2){
       setCourseInfo({...courseInfo,thumbnail:fileReader.result})
       console.log(courseInfo.thumbnail);
     }
    }
     fileReader.readAsDataURL(e.dataTransfer.files[0]);
 
  }
  

  return (
    <div className='w-[85%] m-auto mt-24 '>
      <form action="" onSubmit={handleSubmit}>
      <div>
      <label htmlFor="" className={`${styles.label}`}>Course Name</label>
        <input type="text" name='' required  value={courseInfo.name}
        onChange={(e)=>setCourseInfo({...courseInfo,name:e.target.value})}
        className={`${styles.input}`}
        placeholder='MERN stack LMS platform with next 14'
        />
      </div>
      <br />
      <div className='mb-5'>
      <label htmlFor="" className={`${styles.label}`}>Course Description</label>
       <textarea name="" id="" cols={30} rows={10}  className={`${styles.input}  !py-2 !h-min`} placeholder='Write something amazing...'
       value={courseInfo.description}
        onChange={(e)=>setCourseInfo({...courseInfo,description:e.target.value})}/>
      </div>
      <div className=' w-full flex justify-between'>
      <div className='w-[45%]'>
      <label htmlFor="" className={`${styles.label}`}>Course Price</label>
        <input type="number" name='' required  value={courseInfo.price}
        onChange={(e)=>setCourseInfo({...courseInfo,price:e.target.value})}
        className={`${styles.input}`}
        placeholder='20'
        />
      </div>
      <div className='w-[45%]'>
      <label htmlFor="" className={`${styles.label}`}>Estimated Price (optional)</label>
        <input type="number" name='' required  value={courseInfo.estimatedPrice}
        onChange={(e)=>setCourseInfo({...courseInfo,estimatedPrice:e.target.value})}
        className={`${styles.input}`}
        placeholder='30'
        />
      </div>

      </div>
      <br />
      <div className=' w-full flex justify-between'>
      <div className='w-[45%]'>
      <label htmlFor="" className={`${styles.label}`}>Course Tags</label>
        <input type="text" name='' required  value={courseInfo.tags}
        onChange={(e)=>setCourseInfo({...courseInfo,tags:e.target.value})}
        className={`${styles.input}`}
        placeholder='MERN stack LMS platform with next 14'
        />
      </div>
     
      <div className='w-[45%]'>
      <label htmlFor="" className={`${styles.label}`}>Course Categories </label>
      <select name="" value={courseInfo.categories} id="" onChange={(e)=>setCourseInfo({...courseInfo,categories:e.target.value})}  className={`${styles.input} cursor-pointer dark:bg-slate-900 dark:text-white`}>
      <option value="">Select Category</option>
      {categories.map((item,index)=>{
      return (<option key={index} value={item.title}>{item.title}</option>)
      })}
      </select>
      </div>

      </div>
      
      
      <br />
      <div className=' w-full flex justify-between'>
      <div className='w-[45%]'>
      <label htmlFor="" className={`${styles.label}`}>Course Level</label>
        <input type="text" name='' required  value={courseInfo.level}
        onChange={(e)=>setCourseInfo({...courseInfo,level:e.target.value})}
        className={`${styles.input}`}
        placeholder='Beginner/Intermidate/Expert'
        />
      </div>
      <div className='w-[45%]'>
      <label htmlFor="" className={`${styles.label}`}>Demo Url </label>
        <input type="text" name='' required  value={courseInfo.demoUrl}
        onChange={(e)=>setCourseInfo({...courseInfo,demoUrl:e.target.value})}
        className={`${styles.input}`}
        placeholder='htt://localhost:3000'
        />
      </div>

      </div>
      <br />
      
      <div className='w-full'>
        <input type="file" name="file" id="file"  accept='image/*' 
        className='hidden'
        onChange={handleFileChange}
        />
        <label htmlFor="file" 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeaver}
        onDrop={handleDrop}
        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3  border flex items-center justify-center ${dragging?'bg-blue-500':"bg-transparent"}`} 
        >
  { courseInfo.thumbnail?(<img src={courseInfo.thumbnail} className=' max-w-full w-full object-cover h-[90vh]'/>
        )
        :<span className="text-black dark:text-white">
          Drag and drop your thumbnail here or click to browse
      </span>
      }

        </label>
      </div>
      <br />
      <div className="w-full flex justify-end items-center">
        <button className='w-full 800px:w-[180px] bg-[#37a39a]  h-[40px] text-center text-[#fff] rounded mt-8 cursor-pointer' type='submit'>
          Next
        </button>
      </div>
      <br />
      <br />

      </form>




    </div>
  )
}

export default CourseInformation