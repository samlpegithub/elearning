import toast from 'react-hot-toast';
import { styles } from '../../../app/styles/styles';
import React, { useState } from 'react'
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsLink45Deg, BsPencil } from 'react-icons/bs'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const CourseContent = (props) => {
    const {active,setactive,handleSubmit,courseContentData,setcourseContentData}=props;

    const [isCollepsed, setisCollepsed] = useState(
        Array(courseContentData).fill(false))

        const [activeSection, setactiveSection] = useState(1);

    //Toggle to Section
const handleToggle=(index)=>{    
    const updateCollasped=[...isCollepsed];
     updateCollasped[index]=!updateCollasped[index]

     setisCollepsed(updateCollasped);
 }
    //Add Link in Section
const handleAddLink=(index)=>{
   const updateData=[...courseContentData];
   updateData[index].link.push({title:"",url:""})
   setcourseContentData(updateData);
}
    //Delete Link in Section If greater then one Link
const handleRemoveLink=(index,linkIndex)=>{
    const updateData=[...courseContentData];
    updateData[index].link.splice(linkIndex,1);
    setcourseContentData(updateData);
}

        //Handle Submit Function 
const handleCourseSubmit=(e)=>{

    e.preventDefault();
  }
        //Add Content in previous Section
  const handleNewContent=(items)=>{
    if(items.title===""||items.description===""||items.videoUrl===""||items.link[0].title===""||items.link[0].url===""){
   toast.error('Please fill all the fields first! ')
   
   }else{
   let newVideoSection="";
   if(courseContentData.length>0){
       let lastVideoSection=courseContentData[courseContentData.length-1].videoSection;
       if(lastVideoSection){
     newVideoSection=lastVideoSection;
    const newContent={
       videoUrl:"",
       title:'',
       description:"",
       videoSection:newVideoSection,
       link:[{title:"",url:""}],
   }
   setcourseContentData([...courseContentData,newContent])
       }
   }
   }
   
   } 
   // Add new Section 
   const addNewSection=()=>{
    if(
    courseContentData[courseContentData.length-1].title===""||
    courseContentData[courseContentData.length-1].description===""||
    courseContentData[courseContentData.length-1].videoUrl===""||
    courseContentData[courseContentData.length-1].link[0].title===""||
    courseContentData[courseContentData.length-1].link[0].url===""){
        toast.error('Please fill alll the fields first!');
 }
 else{
    setactiveSection(activeSection+1);
    const newContent={
        videoUrl:"",
        title:"",
        description:"",
        videoSection:`Unitited Section ${activeSection}`,
        link:[{title:"",url:""}],
      }
  setcourseContentData([...courseContentData,newContent]);
}

} 
//Previous Button for Active item
const handlePrev=()=>{
    setactive(active-1);
}
 // Next Button for Active Item
        const handleNext=()=>{
            if(
                courseContentData[courseContentData.length-1].title===""||
                courseContentData[courseContentData.length-1].description===""||
                courseContentData[courseContentData.length-1].videoUrl===""||
                courseContentData[courseContentData.length-1].link[0].title===""||
                courseContentData[courseContentData.length-1].link[0].url===""){
                    toast.error('Please fill alll the fields first!');
                }
                else{
                    setactive(active+1);
                    // console.log(courseContentData);
    handleSubmit();
}
}
return (
    <div className=' w-[90%] m-auto mt-10  p-3 pl-20  '>
    <form action="" onSubmit={handleCourseSubmit}>
    {courseContentData && courseContentData.map((items,index)=>{
      const showSectionInput=index===0 ||
      items.videoSection!==courseContentData[index-1].videoSection
      return(
       <div className={` w-full bg-slate-800 p-4 ${showSectionInput ? "mt-10" : "mb-0"}`} key={index}>
         {showSectionInput &&(
           <div className=' flex w-full items-center '>

           <input type="text" onChange={(e)=>{
               const updateData=[...courseContentData];
               updateData[index].videoSection=e.target.value;
               setcourseContentData(updateData);
           }}  className={`font-Poppins cursor-pointer text-white bg-transparent outline-none ${items.videoSection==='Untited Section'?"w-[100px]":"w-min"}`}  value={items.videoSection}/>
           <BsPencil className='cursor-pointer text-white'/>
           <br/>
            </div>)}
             <div className='flex w-full items-center justify-between my-0'>
                              {isCollepsed[index] ? (
                      <>{items.title ? (<p className=' font-sans pt-4 block  text-white '>{index + 1}.{items.title} </p>) : <></>}</>
                    ) : (<div></div>)}

            {/* Arrow Button for Collasped Video Content */}
                                  
            <div className=' flex items-center'>

 <AiOutlineDelete className={` text-white text-[20px] mr-2 ${index > 0 ?"cursor-pointer":"cursor-no-drop"}`}
 onClick={()=> {
     if (index>0) {
         const updateData=[...courseContentData];
         updateData.splice(index,1);
         setcourseContentData(updateData);


     }

 }}/>


<MdOutlineKeyboardArrowDown fontSize='large' className='text-white  cursor-pointer' style={{transform:isCollepsed[index]?"rotate(180deg)":"rotate(0deg)"}} onClick={()=>handleToggle(index)}/>
</div>        
                      </div>
          {!isCollepsed[index] &&(
                  <>
                   <div className="my-3">
       <label htmlFor="" className={styles.label}>Video Title</label>
       <input type="text"  onChange={(e)=>{
 const updateData=[...courseContentData];
 updateData[index].title=e.target.value;
 setcourseContentData(updateData);

       }}  className={styles.input} value={items.title} placeholder='Project Plan...'/>
   </div>
   <div className="my-3">
       <label htmlFor="" className={styles.label}>Video Url</label>
    <input type="text"  onChange={(e)=>{
const updateData=[...courseContentData];
updateData[index].videoUrl=e.target.value;
setcourseContentData(updateData);

      }}  className={styles.input} value={items.videoUrl} placeholder='Video Url...'/>
  </div>
   <div className="my-3">
       <label htmlFor="" className={styles.label}>Video Length (in minutes)</label>
    <input type="number"  onChange={(e)=>{
const updateData=[...courseContentData];
updateData[index].videoLength=e.target.value;
setcourseContentData(updateData);

      }}  className={styles.input} value={items.videoLength} placeholder='20'/>
  </div>
  <div className="my-3">
      <label htmlFor="" className={styles.label}>Video Description</label>
      <textarea  onChange={(e)=>{
const updateData=[...courseContentData];
updateData[index].description=e.target.value;
setcourseContentData(updateData);



}}  className={`${styles.input} !h-min py-2`} value={items.description} placeholder='Video Description' rows={8}  col={30}/>
<br />
<br />
<br />
{items.link.map((link,linkIndex)=>{return <div className="mb-3 block" key={linkIndex}>
  <div className="w-full flex items-center justify-between">
      <label htmlFor="" className={styles.label}>Link {linkIndex+1}</label>
      <AiOutlineDelete className={` text-white text-[20px] mr-2 ${linkIndex>0?"cursor-pointer":"cursor-no-drop"}`}
   onClick={()=> { 

          linkIndex>0 ?handleRemoveLink(index,linkIndex):""}}/>


   </div>
   <input type="text" placeholder='Source Code... (Link title)'  value={link.title} onChange={(e)=>{
       const updateData=[...courseContentData];
       updateData[index].link[linkIndex].title=e.target.value;
       setcourseContentData(updateData)
   }} className={`${styles.input} `}/>
   <input type="text" placeholder='Source Code Url... (Link URL)'  value={link.url} onChange={(e)=>{
       const updateData=[...courseContentData];
       updateData[index].link[linkIndex].url=e.target.value;
       setcourseContentData(updateData)
   }} className={`${styles.input} mt-6`}/>
</div>
})}
<br />
<div className=' inline-block mb-4'>
   <p className=' flex items-center text-[18px] text-white cursor-pointer' onClick={()=>handleAddLink(index)}>
      <BsLink45Deg className='mr-2'/>Add Link
  </p>
</div>
  </div>
  <br />
  </>
)}

{index ===courseContentData.length-1 && (
<div className=' pt-5'>
   <p className=' flex items-center text-[18px] text-white cursor-pointer' onClick={()=>handleNewContent(items)}>
       <AiOutlinePlusCircle className='mr-2'/>Add New Content

   </p>
</div>
)}
       </div>
      )

    })}
    <br />
    <div className="flex items-center text-[20px] dark:text-white text-black cursor-pointer" onClick={()=>addNewSection()}>
      <AiOutlinePlusCircle className=' mr-2'/>Add New Section
      
    </div>
<br />
    </form>
<div className=" w-full flex items-center justify-between ">
<button className='w-full 800px:w-[180px] bg-[#37a39a]  h-[40px] text-center text-[#fff] rounded mt-8 cursor-pointer' onClick={handlePrev}>
        Prev
      </button>
<button className='w-full 800px:w-[180px] bg-[#37a39a]  h-[40px] text-center text-[#fff] rounded mt-8 cursor-pointer' onClick={handleNext} >
        Next
      </button>
 
</div>  
  
   
<br />
<br />
<br />
  </div>
  )
}

export default CourseContent