'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FAQ from '../../FAQ/FAQ'
const page = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setactiveItem] = useState(4);
    const [route, setroute] = useState("Login");


  return (
    <div className='min-h-screen'>
        <Heading title="FAQ - ELearning" 
      description="ELearing is a platform fot student to learn and get help from teachers"
      keywords="Programming,MERN Stack,Machine Learning,Redux Store "
      />
      <Header 
      open={open}
      setOpen={setOpen} 
      activeItem={activeItem} 
      route={route}
      setroute={setroute}
        />
        <FAQ/>
        <Footer/>
    </div>
  )
}

export default page