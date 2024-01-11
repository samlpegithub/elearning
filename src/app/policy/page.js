'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Policy from './Policy.js'
const page = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setactiveItem] = useState(3);
    const [route, setroute] = useState("Login");


  return (
    <div>
        <Heading title="Policy - ELearning" 
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
        <Policy/>
        <Footer/>
    </div>
  )
}

export default page