
import React from 'react'
import {IoMdCheckmark} from 'react-icons/io'

const CourseOptions = (props) => {
    const {active,setactive}=props;
    const options=[
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview",
      ]

  return (
    <div>
        {options.map((option,index)=>{
            return  <div key={index} className='w-full flex py-5'>
            <div className={`w-[35px] h-[35px] rounded-full flex items-center justify-center 
       ${active+1>index?"bg-blue-500 text-white":"bg-[#384766]" } relative`}>
         <IoMdCheckmark className=" text-[25px]"/>
         {index!==3 && (<div className={`absolute h-[30px] w-1
          ${active+1>index?"bg-blue-500":"bg-[#384766]"} bottom-[-100%]`}>
 
         </div>)}
       </div>
       <div className={`pl-3 ${active ===index?"dark:text-white text-black":"dark:text-white text-black"} text-[20px]`}>
       <h5>{option}</h5>
 
       </div>
       </div>
        })}

    </div>
  )
}

export default CourseOptions