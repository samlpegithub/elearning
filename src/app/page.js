'use client'
import React, { useState } from 'react'
import Heading from './utils/Heading'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Courses from '../components/Route/Courses.js'
import Reviews from '../components/Route/Reviews'
import FAQ from '../FAQ/FAQ.js'
import Footer from '../components/Footer.js'
const page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setactiveItem] = useState(0);

  const [route, setroute] = useState("Login");
  
  return (
    <div>
      <Heading title="ELearnig" 
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
        <Hero/>
        <Courses/>
        <Reviews/>
        <FAQ/>
        <Footer/>
    </div>
  )
}

export default page