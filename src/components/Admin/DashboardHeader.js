'use client'
import ThemeSwitcher from '../../app/utils/ThemeSwitcher';
import React, { useEffect, useState } from 'react'
import {IoMdNotificationsOutline} from 'react-icons/io'
import { format } from 'timeago.js';
import socketIO from 'socket.io-client'
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from '../../../redux/features/notifications/notificationApi';
const DashboardHeader = ({open,setopen}) => {

  const ENDPOINT=process.env.NEXT_PUBLIC_SOCKET_URI
  const socketId=socketIO(ENDPOINT,{transports:['websocket']})
  
  let {data,refetch}=useGetAllNotificationsQuery(undefined,{refetchOnMountOrArgChange:true});
  
  let [updateNotificationStatus,{isSuccess}]=useUpdateNotificationStatusMutation({})
  
    const [notification, setnotification] = useState([]);
    const [audio] = useState(new  Audio(
      'https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3'
      ));

const playerNotificationSound=()=>{
  audio.play();
}

useEffect(()=>{
  if(data){
    setnotification(data.notification.filter((item)=>item?.status==='unread'));
  }
  
  if(isSuccess){
  refetch();
  }
audio.load();
},[isSuccess,data])

 
useEffect(()=>{
 
  socketId.on("newNotification",(data)=>{
    console.log('newNotification',data);   
      refetch();
      playerNotificationSound();

    
  });
},[socketId]);


const handleNotificationStatusChange=async(id)=>{
  await updateNotificationStatus({id});

}

  return (
    <div>
          <div className=' w-full flex items-center justify-end p-6 fixed top-5 right-0'>
      <ThemeSwitcher/>
      <div className="relative cursor-pointer m-2" onClick={()=>setopen(!open)}> 
        <IoMdNotificationsOutline className="text-2xl cursor-ponter dark:text-white text-black"/>
        <span className='absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[10px] 
        flex items-center justify-center text-white '>
          {notification && notification?.length}
          
        </span>

      </div>
      {open &&(
      <div className={` w-[350px] h-[80vh] ${notification.length > 3 && "overflow-y-scroll"} border border-[#ffffff0c] dark:bg-[#111c32] bg-white absolute top-16 !z-10 rounded-lg py-3 px-2  `}>
        <h5 className=' text-center text-[20px] font-Poppins text-black dark:text-white p-3'>
          Notifications
        </h5>
        
        {notification && notification.map((item,index)=>(
          <div className=" dark:bg-[#2d3a4ea1] bg-[#00000013] !font-Poppins border-b-solid border-b dark:border-b-[#ffffff47]" key={index}>
          <div className=" w-full flex items-center justify-between p-2">
            <p className='text-black dark:text-white'>
            {item.title}
            </p>
            <p className='text-black cursor-pointer first: dark:text-white'
            onClick={()=>handleNotificationStatusChange(item._id)}
            >
              Mark as read 
            </p>
          </div>
          <p className=' px-2 text-black dark:text-white'>
           {item.message}
          </p>
          <p className='p-2 text-black dark:text-white text-[14px]'>
          {format(item.createdAt)}
          </p>
        </div>
         ))} 
       
       
      </div>)}

      
    </div>
    </div>
  )
}

export default DashboardHeader