import React from 'react'
import CourseDetailPage from '../../../components/Course/CourseDetailPage.js'
const page = ({params}) => {
    const id=params.id;
  return (
    <div>
        <CourseDetailPage id={id}/>
    </div>
  )
}

export default page