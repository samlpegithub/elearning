'use client'
import React from 'react'
import {Modal,Box} from '@mui/material';
const CustomModel = (props) => {

  const {open,setOpen,activeItem,Component,setroute}=props;

  return (
    <Modal
    open={open}
    onClose={()=>setOpen(false)}
    arial-labelleby='model-model-title'
    arial-describeby='model-model-description'
    >
        <Box class="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[95%] 800px:w-[450px] bg-white border-none dark:bg-slate-900 rounded-[8px]">
        <Component setOpen={setOpen} setroute={setroute}/>
        </Box>
    </Modal>
  )
}

export default CustomModel