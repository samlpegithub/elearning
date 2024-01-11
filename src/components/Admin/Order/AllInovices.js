import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTheme } from 'next-themes';
import { format } from 'timeago.js';
import { Button, Modal, Toolbar } from '@mui/material';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import Loader from '../../../components/Loader/Loader';
import {  useGetAllUsersQuery } from '../../../../redux/features/auth/user/userApi';
import { styles } from '@/app/styles/styles';
import toast from 'react-hot-toast';
import { useGetAllOrdersQuery } from '../../../../redux/features/orders/ordersApi'
import { useGetAllCoursesQuery } from '../../../../redux/features/courses/courseApi';

const AllInovices = ({isDashboard}) => {
 let {theme,setTheme}=useTheme();

 let {data:coursesData}=useGetAllCoursesQuery({});
 let {data:usersData}=useGetAllUsersQuery({})
  let {data,isLoading}=useGetAllOrdersQuery({});
  const [orderData, setOrderData] = useState([]);
    
  useEffect(()=>{
    if(data){
        const temp=data.orders.map((item)=>{
            const user=usersData?.users.find((user)=>{
               return  user._id===item.userId

            })
            const course=coursesData?.courses.find((course)=>{
               return  course._id===item.courseId

            })
            return {
                ...item,
                userName:user?.name,
                userEmail:user?.email,
                title:course?.name,
                price:"$" + course?.price

            }
        })
        setOrderData(temp);
    }
},[data,usersData,coursesData]);

   const columns=[
    {field:"id",headerName:"ID",flex:0.4},
    {field:"userName",headerName:"Name",flex:isDashboard ? 0.5 : 0.5},
    ...(isDashboard ? [] :[
        {field:'userEmail',headerName:'Email',flex:isDashboard ? 1 : 0.8},
        {field:'title',headerName:'Course Title',flex:isDashboard ? 1 :0.8 }]),
        {field:'price',headerName:"Price",flex:isDashboard ? 0.2 : 0.2},
        ...(isDashboard ?[
            {field:'created_at',headerName:'Created At',flex:isDashboard ? 0.3 : 0.3}]:[
                
                {field:'',headerName:"Email",flex:0.2,renderCell:(params)=>{
                return (
                <a href={`mailto:${params.row.userEmail}`} >
                        <AiOutlineMail className=' dark:text-white text-black cursor-pointer' size={20}/>
                    </a>)
                }},
            ])

]

const rows=[];
 orderData && orderData.forEach((item)=>{
    rows.push({
        id:item._id,
        userName:item.userName,
        userEmail:item.userEmail,
        title:item.title,
        price:item.price,
        created_at:format(item.createdAt)

    })
 }) 

  return (
    <div>
          <div className={ !isDashboard ? "mt-[100px]  w-full !min-h-screen ":"mt-0"}>
        {isLoading ? <Loader/> :(
            <Box m={isDashboard?'0':"40px"}>
                   <Box m={isDashboard? "0" : '40px 0 0 0'} height={isDashboard ? "45vh":'90vh'} 
                overflow="hidden"   
                 sx={{ 
            '& .MuiDataGrid-root':{
                border:"none",
                outline:'none'},
                '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon':{
                color:theme==='dark' ? "#fff":"#000"
                },
                '& .MuiDataGrid-sortIcon':{
                color:theme==='dark'? "#fff":"#000"
                },
                
            '& .MuiDataGrid-row':{
                color:theme==='dark'?"#fff":"#000",
                borderBottom:theme==='dark'?'1px solid #ffffff30 !important':"1px solid #ccc !important"
            },
            '& .MuiTablePagination-root':{
                color:theme==='dark'?"#fff":"#000"
                },
                '& .MuiDataGrid-cell':{
                    borderBottom:'none'    
                },
                '& .name-column-cell':{
                    color:theme==='dark'?"#fff":"#000"
                    },
                '& .MuiDataGrid-columnHeaders':{
                    backgroundColor:theme==='dark'?"#3e4396":"#A4A9FC",
                    borderBottom:"none",
                    color:theme==='dark'?"#fff":"#000"
                    },
                    '& .MuiDataGrid-virtualScroller':{
                        backgroundColor:theme==='dark'?"#1F2A40":"#F2F0F0",
                    },
                    '& .MuiDataGrid-footerContainer':{
                        color:theme==='dark'?"#fff":"#000",
                        borderTop:"none",
                        backgroundColor:theme==='dark'?"#3e4396":"#A4A9FC",
                    },
                    '& .MuiCheckbox-root':{
                        color:theme==='dark'?"#b7ebde !important":"#000 !important"
                        },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text':{
                        color:"#fff !important"
                        },
                    
                
                
            }}>
                <DataGrid checkboxSelection rows={rows} columns={columns}
                components={isDashboard ? {}:{Toolbar :GridToolbar}}/>

        </Box>
            </Box>
     )} 
    </div>
    </div>
  )
}

export default AllInovices