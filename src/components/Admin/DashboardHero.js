'use client'
import React,{useState} from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardWidgets from './Widgets/DashboardWidgets.js';

const DashboardHero = ({isDashboard}) => {
  const [open, setopen] = useState(false);
  
  return (
    <div>
        <DashboardHeader open={open} setopen={setopen}/>
        {isDashboard && (
          <>
          <DashboardWidgets open={open}/>
          
          </>
        )}

    </div>
  )
}

export default DashboardHero