import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { FiEdit2 } from 'react-icons/fi';
import { format } from 'timeago.js';
import { Button,Modal } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import {  useDeleteCourseMutation, useGetAllCoursesQuery } from '../../../../redux/features/courses/courseApi';
import Loader from '../../../components/Loader/Loader';
import toast from 'react-hot-toast';

const AllCourses = () => {
     let  {isLoading,data,error,refetch}  =useGetAllCoursesQuery({},{refetchOnMountOrArgChange:true})
  let {theme,setTheme}=useTheme();
  const [active, setactive] = useState(false);
  const [courseId, setcourseId] = useState("")

  const columns=[
    {field:"id",headerName:"ID",flex:0.5},
    {field:"title",headerName:"Course Title",flex:1},
    {field:"ratings",headerName:"Ratings",flex:0.3},
    {field:"purchased",headerName:"Purchased",flex:0.3},
    {field:"created_at",headerName:"Created At",flex:0.5},
    {field:" ",headerName:"Edit",flex:0.2,
    renderCell:(params)=>{
        return (
            <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
                <FiEdit2 className=' dark:text-white text-black' size={20}/>
            </Link>
            </>
        )
    }},
    {field:"",headerName:"Delete",flex:0.3,
    renderCell:(params)=>{
        return (
            <>
            <Button>
                <AiOutlineDelete className=' dark:text-white text-black' size={20} 
                onClick={()=>{
                    setactive(true)
                    setcourseId(params.row.id);
                    }}
                    />
            </Button>
            </>
        )
    }}
  ]
  let [deleteCourse,{isSuccess,error:deleteError}]=useDeleteCourseMutation()
  const handleDelete=async()=>{
    setactive(false);
    await deleteCourse({
        id:courseId
    })
  }
  useEffect(()=>{
if(isSuccess){
  refetch();
  toast.success("Delete course successfully");
}
if(deleteError){
  toast.error(error.data.message);
}
  },[isSuccess,error]);

  const rows=[]
{data && data.courses.map((item)=>{
  rows.push({
    id:item._id,
    title:item.name,
    ratings:item.ratings,
    purchased:item.purchased,
    created_at:format(item.createdAt)


  })
})}



  return (
    <div className='mt-[100px] h-screen'>
     {isLoading?
      (<Loader/>)
     :(
      <Box>
          {active && <Modal open={active} onClose={()=>setactive(false)}
                aria-labelledby='modal-modal-title'
                aira-aria-describedby='modal-modal-description'><Box className='absolute pb-6 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 800px:w-[400px] w-full bg-white dark:bg-slate-900 rounded-[8px]'>
                   
                    <div>
                    <h1  className='text-center font-Poppins pt-5 pb-2 px-3 font-semibold text-[25px] text-black dark:text-white'>Are you sure you want to delete this course?</h1>
                    <div className=' flex items-center justify-between mt-3 '>
                        <button className={`font-Poppins !h-[40px] font-semibold rounded-md ml-2 !w-[100px] !bg-[#57c7a3] !text-white items-center`} onClick={()=>setactive(false)}>Cancel</button>
                        <button className={`ont-Poppins !h-[40px] font-semibold rounded-md mr-3 !w-[100px] !bg-red-500 !text-white items-center`} onClick={handleDelete}>Delete</button>

                    </div>
                   

                    </div>
                    
                    
                    
                    
                    </Box></Modal>}
      <Box
       m={'50px 0 0 0'} height={'80vh'} sx={{
        '& .MuiDataGrid-root':{
            border:"none",
            outline:'none'},
            '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon':{
            color:theme==='dark'?"#fff":"#000"
            },
            '& .MuiDataGrid-sortIcon':{
            color:theme==='dark'?"#fff":"#000"
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
                
            
            
        }}
      
      >
        <DataGrid
        checkboxSelection
        rows={rows}
        columns={columns}

        />
      </Box>
    </Box>
     )}
        
    </div>
  )
}

export default AllCourses