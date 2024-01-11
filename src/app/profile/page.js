'use client'
import React, { useState } from 'react'
import {Protected} from '../hooks/useProtected'
import Heading from '../utils/Heading';
import Header from '../../components/Header';
import Profile from '../../components/Profile/Profile.js';
import { useSelector } from 'react-redux';
import Footer from '@/components/Footer';

const page = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setactiveItem] = useState(5);
  
    const [route, setroute] = useState("Login");
    const {user}=useSelector((state)=>state.auth)
  return (
    <Protected>
 <Heading title={`${user.name} profile`} 
      description="ELearing is a platform fot student to learn and get help from teachers"
      keywords="Programming,MERN Stack,Machine Learning,Redux Store "
      />
        <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setroute={setroute}
        route={route}
        />
        <Profile user={user}/>
        <Footer/>
    </Protected>
  )
}

export default page