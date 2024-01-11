'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useGetUserAllCoursesQuery } from '../../../redux/features/courses/courseApi';
import { useGetHeroDataQuery } from '../../../redux/features/layout/layoutApi';
import Loader from '@/components/Loader/Loader';
import Heading from '../utils/Heading';
import Header from '@/components/Header';
import { styles } from '../styles/styles';
import CourseCard from '@/components/Course/CourseCard';
import Footer from '@/components/Footer';

const page = () => {
  let searchParams = useSearchParams()
  const search = searchParams?.get("title");

  let { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  let { data: categoriesData } = useGetHeroDataQuery('Categories', {});
console.log(data);
  const categories=categoriesData?.layout?.categories;
  
  const [category, setcategory] = useState('All');
  const [route, setroute] = useState("");
  const [open, setopen] = useState("");
  const [courses, setCourses] = useState([]);



  useEffect(() => {
    if (category ==='All') {
      setCourses(data?.courses)
    }
    if (category !=='All') {
      let course=data?.courses?.filter((item)=>item?.categories===category)
      console.log(course);
      setCourses(course);
    }
    if (search) {
      setCourses(data?.courses?.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase())));

    }
  }, [data, category, search]);
  return (
    <div>
      {isLoading ? <Loader /> : (
        <>
          <Header
            open={open}
            setopen={setopen}
            route={route}
            setroute={setroute}
            activeItem={1}
          />
          <Heading
            title='All courses - Elearing'
            description="Elearning is a progromming community."
            keywords={'programming community,coding skills,expert insight, collaboration, growth'}
          />
          <div className=' w-[95%] 800px:w-[85%] m-auto  text-black dark:text-white'>
            <div className=' w-full flex items-center flex-wrap text-white pt-5'>

              <div className={`h-[35px] ${category === 'All' ? " bg-[crimson]" : "bg-[#5050bc]"}
m-2 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setcategory('All')}
              >All</div>
              {categories && categories.map((item,index)=>{
                   return ( <div key={index}>
                        <div className={`h-[35px] ${category===item.title ?" bg-[crimson]":"bg-[#5050bc]"}
                m-2 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={()=>setcategory(item.title)}
                
                >{item.title}</div>
                    </div>)
                })}
            </div>
            {courses && courses.length===0 && (
              <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                {search?"No Courses found!":"No courses foung in this category.Please try another one!"}
              </p>
            )}
            <br />
            <br />
            <div className=' grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] 800px:mb-28 '>
              {courses && courses.map((item,index)=>{
                return (<CourseCard item={item} key={index}/>)
              })}
              </div>

          </div>
          <Footer/>
        </>
      )}
    </div>
  )
}

export default page