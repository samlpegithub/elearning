import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useGetOrdersAnalyticsQuery } from '../../../../redux/features/analytics/course-analytics'
import Loader from '@/components/Loader/Loader';
import { styles } from '@/app/styles/styles';

const OrdersAnalytics = ({isDashboard}) => {

    let {data,isLoading}=useGetOrdersAnalyticsQuery({});
let analytics=[];
data && data?.orders?.last12Months?.forEach((item)=>{
  return analytics.push({name:item.month,count:item.count});
});
console.log(data);

    return (
    <div>
      {isLoading ? <Loader/>:(
          <div className={`w-full  ${isDashboard?"!h-[50vh]":"h-screen "}`}>
          <div className={`${isDashboard?"mt-[0px]   mb-2":"mt-[100px] "}     `}>
          <h1 className={`${styles.title} ${isDashboard && "text-[20px]"} px-5 !text-start `}> Orders Analytics</h1>
              {!isDashboard &&(   
                  <p className={`${styles.label} pl-2 `}>Last 12 month analytics data {" "}</p>

              )}
          </div>
    <div className={`w-full  800px:w-[95%] ${!isDashboard?" h-[90%]":"h-full"}  ${isDashboard?"pt-0":"800px:pt-24 pt-10"}`}>
    <ResponsiveContainer width="100%" height={isDashboard?"80%":"50%"}>
        <LineChart
          width={500}
          height={isDashboard?"100%":300}
          data={analytics}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
         {!isDashboard && <Legend  />}
          <Line type="monotone" dataKey="count"  stroke="#82ca9d"  />
        </LineChart>
      </ResponsiveContainer>
  
    </div>
      </div>
      )}
    </div>
  )
}

export default OrdersAnalytics