import React from 'react'
import {ResponsiveContainer,XAxis,YAxis,AreaChart,Tooltip,Area} from 'recharts';

import { useGetUsersAnalyticsQuery } from '../../../../redux/features/analytics/course-analytics'
import Loader from '@/components/Loader/Loader'
import { styles } from '@/app/styles/styles';

const UsersAnalytics = ({isDashboard}) => {
    let {data,isLoading}=useGetUsersAnalyticsQuery({});
    // const analytics=[
    //     {name:"January 2023",count:4400},
    //     {name:"Fabruary 2023",count:800},
    //     {name:"March 2023",count:1000},
    //     {name:"April 2023",count:1500},
    //     {name:"May 2023",count:2000},
    //     {name:"Jun 2023",count:3000},
    //     {name:"July 2023",count:990},
    //     {name:"August 2023",count:550},
    //     {name:"Sept 2023",count:1500},
    //     {name:"Octobar 2023",count:2000},
    //     {name:"Nov 2023",count:2500},
    //     {name:"Decembar 2023",count:4050},
    // ]
    let analytics=[]
    data && data?.users?.last12Months?.forEach((item)=>{
        return analytics.push({name:item.month,count:item.count})
     });
  return (
    <div>
        {isLoading ? (<Loader/>):(
            <>
              
     <div className={`${!isDashboard ? "mt-[50px]" :"mt-[30px] dark:bg-[#111c43] shadow-sm pb-5 rounded-sm"}`}>
            <div className={`${isDashboard ? "!ml-3 mb-5 ":""}`}>
                <h1 className={`${styles.title} ${isDashboard && "!text-[20px]"} px-5 !text-start  }`}> Users Analytics</h1>
                    {!isDashboard && (
                        <p className={`${styles.label}  pl-2 `}>Last 12 months analytics data {" "}</p>
                    )}
            </div>
            <div className={`w-[90%]  ${isDashboard ? 'h-[50vh]' : "h-screen"} flex items-center  justify-end`}>
                <ResponsiveContainer width={isDashboard ?"100%":"90%"} height={!isDashboard?"50%":"100%"}>
                    <AreaChart data={analytics} margin={{
                        top:20,
                        right:30,
                        left:0,
                        bottom:0
                    }}>
                        <XAxis dataKey={'name'}/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='count' stroke='#4d62d9' fill='#4d62d9'></Area>
                    </AreaChart>
                </ResponsiveContainer>
            </div>

        </div>
            
            
            </>

        )}
    </div>
  )
}

export default UsersAnalytics