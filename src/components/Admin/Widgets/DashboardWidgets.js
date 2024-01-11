import React, { useEffect, useState } from 'react'
import UsersAnalytics from '../Analytics/UsersAnalytics'
import { BiBorderLeft } from 'react-icons/bi'
import { Box, CircularProgress } from '@mui/material'
import {PiUsersFourLight} from 'react-icons/pi'
import OrdersAnalytics from '../Analytics/OrdersAnalytics'
import AllInvoices from '../../../components/Admin/Order/AllInovices'
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from '../../../../redux/features/analytics/course-analytics'
import Loader from '@/components/Loader/Loader'

const CircularProgressWithLabel=({value,open})=>{
      return (
      <CircularProgress  variant='determinate' value={value} size={45} 
      color={value && value > 99 ? "info" : "error" }
      thickness={4} style={{display: open ? "none" : "block" }} >
    
    <Box sx={{position:"relative"}}>
      <Box sx={{position:"absolute",
      top:0,
      left:0,
      right:0,
      bottom:0,
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
      
      
    }}></Box>
    </Box>
    </CircularProgress>
    
      )
    }
const DashboardWidgets = ({open}) => {

  const [orderComparePercentage, setorderComparePercentage] = useState();
  const [userComparePercentage, setuserComparePercentage] = useState();

  const {data,isLoading}=useGetUsersAnalyticsQuery({});  
  const {data:orderData,isLoading:orderLoading}=useGetOrdersAnalyticsQuery({});
  
  useEffect(() => {
    if(isLoading && orderLoading){return }
    else{
     if(data && orderData){
       const userLastMonths=data.users.last12Months.slice(-2);
       const orderLastMonths=orderData.orders.last12Months.slice(-2);

       
       if(userLastMonths.length===2 && orderLastMonths.length===2){
         const usersCurrentMonth=userLastMonths[1].count;
         const usersPreviousMonth=userLastMonths[0].count;
         
         const ordersCurrentMonth=orderLastMonths[1].count;
         const ordersPreviousMonth=orderLastMonths[0].count;

         const usersPercentChange=usersPreviousMonth!==0 ?((usersCurrentMonth-usersPreviousMonth) / usersPreviousMonth) *100:100

         const ordersPercentChange=ordersPreviousMonth!==0 ?
         ((ordersCurrentMonth-ordersPreviousMonth) / ordersPreviousMonth) * 100 : 100

       setuserComparePercentage({
         currentMonth:usersCurrentMonth,
         previousMonth:usersPreviousMonth,
         percentChange:usersPercentChange
       })

       setorderComparePercentage({
currentMonth:ordersCurrentMonth,
previousMonth:ordersPreviousMonth,
percentChange:ordersPercentChange
       })
       
       
      }
    }
  }
}, [isLoading,orderLoading,data,orderData])

console.log({orderComparePercentage},{userComparePercentage});
  return (
    <>
     {isLoading ?<Loader/>:(
           <div className=' mt-[10px]  pb-10  '>
           {/* User Analytics component layout */}
     <div className=' grid grid-cols-[75%,25%]'>
       <div className='m-8  mb-0'>
         <UsersAnalytics isDashboard={true}/>
       </div>

       <div className=' !pt-[80px] pr-2 '>
         <div className=' w-full dark:bg-[#111c43] rounded-sm shadow'>
           <div className=' flex items-center justify-between   p-4 '>
             
             <div className="">
              <BiBorderLeft className=' dark:text-[#45cbad] text-black text-[30px]'/>
              <h1 className='pt-2 font-Poppins dark:text-white text-black text-[20px]'>
              {orderComparePercentage?.currentMonth}
              </h1> 
              <h1 className='py-2 font-Poppins dark:text-[#45cbad] text-black text-[20px] font-[400]'>Sales Obtained</h1> 
             </div>
             <div >
               <CircularProgressWithLabel value={
                   orderComparePercentage?.percentChange >0 ? 100:0
                 
               } open={open}/>
               <h1 className=' text-center pt-4  font-Poppins dark:text-white text-black text-[20px]'>
                  {orderComparePercentage?.percentChange>0?
                 "+" + orderComparePercentage?.percentChange.toFixed(2):
                 "-" + orderComparePercentage?.percentChange.toFixed(2)}%
               </h1>
             </div>
             <div >


               </div>
               </div>
               </div>


               <div className=' w-full dark:bg-[#111c43] rounded-sm shadow my-8 '>
           <div className=' flex items-center justify-between  p-4'>
             <div className=''>

             <PiUsersFourLight className="dark:text-[#45cbad] text-black text-[30px]"/>
             <h1 className=' py-2 font-Poppins  dark:text-white text-black text-[20px]'>
               {userComparePercentage?.currentMonth}
             </h1>
             <h1 className='py-2 font-Poppins dark:text-[#45cbad] text-black text-[20px] font-[400]'>New Users</h1>

             </div>
         <div>
           
         <CircularProgressWithLabel value={
           userComparePercentage?.percentChange > 0 ? 100 : 0
         } open={open}/>
               <h1 className=' text-center pt-4  font-Poppins dark:text-white text-black text-[20px]'>
                 {userComparePercentage?.percentChange > 0 ?
                 "+"+userComparePercentage?.percentChange.toFixed(2):
                 "-"+userComparePercentage?.percentChange.toFixed(2)}%
               </h1>
               </div>
         </div>




           <div>
           </div>
         <div >
         </div>
         </div>


       </div>
       </div>
   {/*End User Analytics component layout */}


   {/* Order Analytics component layout */}
       <div className=' grid grid-cols-[63%,37%]    pt-8'>
       <div className='dark:bg-[#111c43] w-[94%] shadow-sm m-auto  '>
           <div className=' my-0 pb-4'>
         <OrdersAnalytics isDashboard={true}/>

           </div>
           </div>

           <div className=' pr-1'>
         <h1 className='dark:text-white text-black text-[20px] font-[400] font-Poppins pb-2 '>
            Recent Transactions
         </h1>
       <AllInvoices isDashboard={true}/>
        
       </div>
           </div>
   {/*End Order Analytics component layout */}

       </div>
     )}
    </>
  )
}

export default DashboardWidgets