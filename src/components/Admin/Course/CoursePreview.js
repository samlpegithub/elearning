import React from 'react'
import CouresPlayer from '../../../app/utils/CouresPlayer.js'
import { styles } from '../../../app/styles/styles.js';
import Ratings from '../../../app/utils/Ratings.js'
import {IoCheckmarkDoneOutline} from 'react-icons/io5'
const CoursePreview = (props) => {
    const {active,setactive,courseData,setcourseData,handleCourseCreate,isEdit}=props;
// let courseData={
//   demoUrl:"ab3f682d2d354e4bb35bc97c6d94b719",
//   name:"Introduction To Next Js ",
//   title:"Demo video",
//   price:20,
//   estimatedPrice:30,
//   description:"Description",
//   benefits:[
//     {title:"some benefits to join this course!"  },
//     {title:"some benefits to join this course!"  }
// ],
//   prerequisites:[
//     {title:"some prerequisite to join this course!"  },
//     {title:"some prerequisite to join this course!"  }
// ]

// }
    const discountPercentage=((courseData?.estimatedPrice-courseData?.price)/courseData?.estimatedPrice)*100
    const discountPercentagePrice=discountPercentage.toFixed(0);

    const handlePrev=()=>{
     setactive(active-1)
    }
    const createCourse=()=>{
      handleCourseCreate();

    }
    
    return (
      <>
    <div className='w-[90%] m-auto py-5 mb-5  dark:text-white text-black'>
        <div className=' w-full   relative'>
            <div className='w-full mt-10'>
                <CouresPlayer
                videoUrl={courseData.demoUrl}
                title={courseData.title}
                />
            </div>
            <div className=' flex items-center pl-4 '>
        <h1 className=' pt-4 text-[25px]'>
          {courseData?.price ===0?"Free ":   courseData?.price + "$"}          

        </h1>
        <h1 className=' pl-3 text-[20px] mt-1 line-through opacity-80'>
          {   courseData?.estimatedPrice}$          
        </h1>
        <h1 className='pl-5 pt-4 text-[22px]'>
          {discountPercentagePrice}% Off
        </h1>
      </div>
      <div className="flex items-center ">
        <button className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson]   cursor-not-allowed`}>
          Buy Now {courseData?.price}$
        </button>
        </div>
        <div className='flex items-center '>
        <input type="text" className={`${styles.input} 1500px:!w-[50%] 800px:!w-[60%] ml-3 !mt-0`}  placeholder='Discount code...'/>
        <button className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}>Apply</button>
      </div>
      <div className=' '>
      <ul>
    <li className='pb-1'> Source code Included</li>
      <li className='pb-1'>Full lifetime assess</li>
      <li className='pb-1'>Certificate of completion</li>
      <li className='pb-3 800px:pb-1'>Premium Support</li>
      </ul>
      </div>
      <div className='w-full'>
        <div className='w-full 800px:pr-5'>
          <h1 className=' text-[25px] font-Poppins font-[600]'>
            {courseData?.name}
          </h1>
            <div className=' flex items-center justify-between pt-3'>
            <div className=' flex items-center'>
              <Ratings rating={2.5}/>
              <h1>0 Reviews</h1>
            </div>
            <h1>0 Students</h1>
          </div>
          <br />
          </div>
          <h1 className=' text-[25px] font-Poppins font-[600] '>
        What you will learn from this course?
      </h1>
          </div>
          {courseData?.benefits.map((item,index)=>(
  <div className=' w-full flex 800px:items-center py-2 ' key={index}>
      <IoCheckmarkDoneOutline size={20} className='mr-1 text-blue-500'/>
      <p>{item.title}</p>

  </div>))}
          
          <br />
          <br />
          {courseData?.prerequisites.map((item,index)=>(
  <div className=' w-full flex 800px:items-center py-2 ' key={index}>
      <IoCheckmarkDoneOutline size={20} className='mr-1 text-blue-500'/>
      <p>{item.title}</p>

  </div>))}
          
          <br />
          <br />
          {/* {course description} */}
          <div className=' w-full'>
             <h1 className=' font-Poppins text-[25px] font-[600]'>
              Course Details
             </h1>
             <p className='text-[18px] mt-[20px]  w-full overflow-hidden'>
              {courseData.description}
             </p>
          </div>
          <br />
          <br />
          <div className=" w-full flex items-center justify-between ">
<button className='w-full 800px:w-[180px] bg-[#37a39a]  h-[40px] text-center text-[#fff] rounded mt-8 cursor-pointer' onClick={handlePrev}>
        Prev
      </button>
<button className='w-full 800px:w-[180px] bg-[#37a39a]  h-[40px] text-center text-[#fff] rounded mt-8 cursor-pointer' onClick={createCourse} >
        {isEdit?"Update":"Create"}
      </button>
 
</div>  
  
        </div>
    </div>
      </>
  )
}

export default CoursePreview