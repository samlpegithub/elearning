'use client'
import React, { useEffect, useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent.js'
import CoursePreview from './CoursePreview.js'
import {  useEditCourseMutation, useGetAllCoursesQuery } from '../../../../redux/features/courses/courseApi'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

const EditCourse = ({id}) => {
             let {data,refetch}=useGetAllCoursesQuery({},{refetchOnMountOrArgChange:true});
             let [editCourse,{isSuccess,error,isLoading}]=useEditCourseMutation()
             
const editCourseData=data && data.courses.find((item)=>item._id===id);

    const [active, setactive] = useState(0);
    const [courseInfo, setCourseInfo] = useState({
        name:"",
        description:"",
        price:"",
        estimatedPrice:"",
        tags:"",
        level:"",
        demoUrl:"",
        thumbnail:""
    })
    const [benefits, setBenefits] = useState([{title:""}])
    const [prerequisites, setPrerequisites] = useState([{title:""}])
    const [courseData, setcourseData] = useState({})
    const [courseContentData, setcourseContentData] = useState([{
        videoUrl:"",
        title:"",
        description:"",
        videoSection:"unitited Section",
        videoLength:"",
        link:[{title:"",url:""}],
        suggestion:""
      }]);
 useEffect(()=>{
if(editCourseData){
  setCourseInfo({
    name:editCourseData.name,
    description:editCourseData.description,
    price:editCourseData.price,
    estimatedPrice:editCourseData.estimatedPrice,
    tags:editCourseData.tags,
    level:editCourseData.level,
    demoUrl:editCourseData.demoUrl,
    thumbnail:editCourseData.thumbnail.url
  });
  setBenefits(editCourseData.benefits);
  setPrerequisites(editCourseData.prerequisites);
  setcourseContentData(editCourseData.courseData);
 

  
  
}
},[editCourseData])


      const handleSubmit=async()=>{
        console.log('handleSubmit');
        //Format Benefits Array
        const formatedBenefits=benefits.map((benefits)=>{
            return { title:benefits.title}});
        //Format Prerequsites Array
          const formatedprerequisties=prerequisites.map((prerequisties)=>{
           return{ title:prerequisties.title}})
           //Format Course Content Data Array
          const formatedCourseContentData=courseContentData.map((items)=>{
            return {
            videoUrl:items.videoUrl,
            title:items.title,
            description:items.description,
            videoSection:items.VideoSection,
            videoLength:items.videoLength,
            link:items.link.map((link)=>{return {title:link.title,url:link.url} }),
            suggestion:items.suggestion
          }})

            //prepare Data object 
            const data={
                name:courseInfo.name,
                description:courseInfo.description,
                tags:courseInfo.tags,
                price:courseInfo.price,
                estimatedPrice:courseInfo.estimatedPrice,
                level:courseInfo.level,
                thumbnail:courseInfo.thumbnail,
                demoUrl:courseInfo.demoUrl,
                totalVideos:courseContentData.length,
                benefits:formatedBenefits,
                prerequisites:formatedprerequisties,
                courseContent:formatedCourseContentData   
            }
            setcourseData(data);
            
            
        }

    const handleCourseCreate=async()=>{
            const data=courseData;
            if(!isLoading){
            await editCourse({id:editCourseData._id,data});
          }
    }
    useEffect(()=>{
      if(isSuccess){
        refetch();
        toast.success('Course Updated successfully');
        redirect('/admin/courses')
      }
      if(error){
        toast.error(error.data.message);
      }

    },[isSuccess,error])
        
  return (
    <div className=' w-full flex min-h-screen'>
        <div className=' w-[80%] '>
    {active===0 && <CourseInformation 
    courseInfo={courseInfo}
    setCourseInfo={setCourseInfo}
    active={active}
    setactive={setactive}
    />}
    
    {active===1 && <CourseData 
    benefits={benefits}
    setBenefits={setBenefits}
    prerequisites={prerequisites}
    setPrerequisites={setPrerequisites}
    active={active}
    setactive={setactive}
    />}

    {active===2 && <CourseContent 
    courseContentData={courseContentData}
    setcourseContentData={setcourseContentData}
    active={active}
    setactive={setactive}
    handleSubmit={handleSubmit}
    />}
    {active===3 && <CoursePreview 
    courseData={courseData}
    handleCourseCreate={handleCourseCreate}
    active={active}
    setactive={setactive}
    isEdit={true}
    />}
        </div>
        <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0'>
            <CourseOptions active={active} setactive={setactive}/>
        </div>
    </div>
  )
}

export default EditCourse