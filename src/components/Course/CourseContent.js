import React, { useState } from 'react'
import { useGetCourseContentQuery } from '../../../redux/features/courses/courseApi'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import CourseContentMedia from './CourseContentMedia.js'
import Header from '../Header';
import CourseContentList from './CourseContentList';
import Footer from '../Footer';
const CourseContent = ({ id,user }) => {
    let { data: contentData, error, isLoading,refetch } = useGetCourseContentQuery(id, {refetchOnMountOrArgChange:true});
    let data = contentData && contentData.content
    const [activeVideo, setActiveVideo] = useState(0);
    const [open, setOpen] = useState(false);
    const [route, setroute] = useState("Login");
    return (
        <>
            {isLoading ? <Loader /> : (

                <div>
                    <Header activeItem={1}
                    open={open}
                    setOpen={setOpen}
                    route={route}
                    setroute={setroute}
                    />
                    <Heading title={data[activeVideo].title}
                        description="ELearing is a platform fot student to learn and get help from teachers"
                        keywords={data[activeVideo].tags}
                    />
                    <div className=' w-full grid   800px:grid-cols-10 '>
                        <div className=' col-span-7 '>
                            <CourseContentMedia
                            data={data}
                            id={id}
                            activeVideo={activeVideo}
                            setActiveVideo={setActiveVideo}
                            user={user}
                            refetch={refetch}
                            />
                        </div>
                        <div className=' hidden 800px:block 800px:col-span-3 '>
                            <CourseContentList
                           
                            setActiveVideo={setActiveVideo}
                            data={data}
                            activeVideo={activeVideo}
                            />
                        </div>
                    </div>
                    <Footer/>
                </div>
            )}
        </>
    )
}

export default CourseContent