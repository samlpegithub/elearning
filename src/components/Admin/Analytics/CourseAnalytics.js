import React from 'react'
import {BarChart,Bar,ResponsiveContainer,XAxis,YAxis,Label,LabelList} from 'recharts';

import { useGetCourseAnalyticsQuery } from '../../../../redux/features/analytics/course-analytics'
import Loader from '@/components/Loader/Loader';
import { styles } from '@/app/styles/styles';

const CourseAnalytics = () => {
    
    let {data,isLoading,error}=useGetCourseAnalyticsQuery({});
    
  
const analytics=[]
let minValues=0
data && data?.courses?.last12Months?.forEach((item)=>{
   return  analytics.push({name:item.month,uv:item.count})
})
console.log(data?.courses?.last12Months)
  return (
    <div>
        {isLoading?(<Loader/>):
        (<>
         <div className='h-[100vh]  ' >
            <div className=' mt-[50px] 800px:pl-[20px]  '>
                <h1 className={`${styles.title} px-5 !text-start`}>Courses Analytics </h1>
                <p className={`${styles.label} `}>Last 12 month analytics data {" "}</p>
            </div>
            <div className='w-full h-[90%]   flex items-center justify-center 800px:pb-10'>
                <ResponsiveContainer width="90%" heigth="50%" >
                <BarChart width={150} height={200} data={analytics}>

                    <XAxis dataKey={'name'}>
                        <Label offset={0} position={'insideBottom'}/>
                    </XAxis>
                    <YAxis domain={[minValues,'auto']}/>
                        <Bar dataKey='uv' fill='#3faf82'>
                            <LabelList data='uv' position={'top'}/>
                        </Bar>
                 
                </BarChart>
                </ResponsiveContainer>
            </div>
        </div>   
        
        
        </>)}
    </div>
  )
}

export default CourseAnalytics