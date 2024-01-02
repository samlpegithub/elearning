import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from 'next-themes';
import { format } from 'timeago.js';
import { Button, Modal } from '@mui/material';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import Loader from '../../../components/Loader/Loader';
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '../../../../redux/features/auth/user/userApi';
import { styles } from '@/app/styles/styles';
import toast from 'react-hot-toast';

const AllUser = ({isTeam}) => {
    let  {isLoading,data,refetch}  =useGetAllUsersQuery({},{refetchOnMountOrArgChange:true})
 let {theme,setTheme}=useTheme();
 const [active, setactive] = useState(false);
 const [open, setopen] = useState(false);
 const [email, setemail] = useState("");
const [role, setrole] = useState('admin');
const [userId, setuserId] = useState('')

 const columns=[
   {field:"id",headerName:"ID",flex:0.5},
   {field:"name",headerName:"Name",flex:0.7},
   {field:"email",headerName:"Email",flex:1},
   {field:"role",headerName:"Role",flex:0.3},
   {field:"purchased",headerName:"Purchased Courses",flex:0.3},
   {field:"created_at",headerName:"Join At",flex:0.4},
   {field:"",headerName:"Delete",flex:0.3,
   renderCell:(params)=>{
       return (
           <>
           <Button>
               <AiOutlineDelete className=' dark:text-white text-black' size={20} 
               onClick={()=>{
                   setactive(true)
                   setuserId(params.row.id)
                   }}
                   />
           </Button>
           </>
       )
   }},
   {field:" ",headerName:"Email",flex:0.3,
   renderCell:(params)=>{
       return (
           <>
           <a href={`mailto:${params.row.email}`}>
               <AiOutlineMail className=' dark:text-white text-black' size={20} 
               
                   />
           </a>
           </>
       )
   }}
 ]

 const rows=[]
if(isTeam && data){
    const newData=data.users.filter((item)=>item.role==='admin')
    console.log(data);
    newData && newData.map((item)=>{
        rows.push({
          id:item._id,
          name:item.name,
          email:item.email,
          role:item.role,
          purchased:item.courses.length,
          created_at:format(item.createdAt)
       
       
        })
       })

}else{
    data && data.users.map((item)=>{
        rows.push({
          id:item._id,
          name:item.name,
          email:item.email,
          role:item.role,
          purchased:item.courses.length,
          created_at:format(item.createdAt)
       
       
        })
       })
    }
    let [updateUserRole,{isSuccess:updateSuccess,error:updateError}]=useUpdateUserRoleMutation()
const handle=async(e)=>{
    e.preventDefault();
    setopen(false);

  await  updateUserRole({email,role})
    


}
let [deleteUser,{isSuccess:deleteSuccess,error:deleteError}]=useDeleteUserMutation();
const handleDelete=async()=>{
    setactive(false);
    await deleteUser({
        id:userId
    })



}
useEffect(()=>{
    if(updateSuccess){
        refetch()
        toast.success("User role updated successfully");
        
    }
    if(deleteSuccess){
        refetch()
        toast.success("Delete user successfully");

    }
    if(updateError || deleteError){
        toast.error(updateError.data.message ||deleteError.data.message);
    }

},[updateSuccess,updateError,deleteSuccess])


 return (
   <div className='mt-[100px] h-screen'>

    {isLoading?
     (<Loader/>)
    :(
     <Box>
        <div className=' w-full flex  justify-end'>
            <button className={`rounded-md !w-[190px] !h-[40px] bg-[#2190ff] text-white dark:bg-[#57c7a3] dark:border dark:border-[#ffffff6c]  font-semibold`}
            onClick={()=>setopen(true)}
            >Add New Member</button>
        </div>
        {open && <Modal open={open} onClose={()=>setopen(false)}
                aria-labelledby='modal-modal-title'
                aira-aria-describedby='modal-modal-description'><Box className='absolute pb-6 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 800px:w-[450px] w-full bg-white dark:bg-slate-900 rounded-[8px]'>
                    <form action="" onSubmit={handle}>
                    <div>
                    <h1  className='text-center font-Poppins py-4 font-semibold text-[25px] text-black dark:text-white'>Add New Member</h1>
                   <div className='px-2'>
                   <input type='email' required className={`${styles.input} font-Poppins `}  placeholder='Enter email...' onChange={(e)=>setemail(e.target.value)} />
                   <select name="" id="" className={`${styles.input} font-Poppins   cursor-pointer`} value={role} onChange={(e)=>setrole(e.target.value)} required>
                    <option  className=' bg-white dark:bg-slate-900' value={"admin"}>Admin</option>
                    <option className=' bg-white dark:bg-slate-900' value="user">User</option>
                   </select>
                   </div>
                   <div className='px-2'>
                   <button className={`${styles.button} mt-3  text-white  bg-blue-500`} type='submit'>Submit</button>
                   </div>

                    </div>
                    
                    </form>
                    
                    
                    </Box></Modal>}
                    {active && <Modal open={active} onClose={()=>setactive(false)}
                aria-labelledby='modal-modal-title'
                aira-aria-describedby='modal-modal-description'><Box className='absolute pb-6 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 800px:w-[400px] w-full bg-white dark:bg-slate-900 rounded-[8px]'>
                   
                    <div>
                    <h1  className='text-center font-Poppins pt-5 pb-2 px-3 font-semibold text-[25px] text-black dark:text-white'>Are you sure you want to delete this user?</h1>
                    <div className=' flex items-center justify-between mt-3 '>
                        <button className={`font-Poppins !h-[40px] font-semibold rounded-md ml-2 !w-[100px] !bg-[#57c7a3] !text-white items-center`} onClick={()=>setactive(false)}>Cancel</button>
                        <button className={`ont-Poppins !h-[40px] font-semibold rounded-md mr-3 !w-[100px] !bg-red-500 !text-white items-center`} onClick={handleDelete}>Delete</button>

                    </div>
                   

                    </div>
                    
                    
                    
                    
                    </Box></Modal>}
     <Box
      m={'20px 0 0 0'} height={'80vh'} sx={{
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


export default AllUser