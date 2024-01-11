'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../../components/Header'
import About from './About'
import Footer from '../../components/Footer'

const page = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setactiveItem] = useState(2);
    const [route, setroute] = useState("Login");


  return (
    <div>
        <Heading title="About us - ELearning" 
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
        <About/>
        <Footer/>
    </div>
  )
}

export default page