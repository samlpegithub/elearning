'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CouresPlayer = (props) => {
    const {videoUrl,title}=props;

    // let videoUrl='ab3f682d2d354e4bb35bc97c6d94b719'
    
    const [videoData, setvideoData] = useState({
        otp:"",
        playbackInfo:""
    })
    useEffect(()=>{
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`,{
        videoId:videoUrl
    }).then((response)=>{
        setvideoData(response.data)
    })
    },[videoUrl])

  return (
    <>
       <div style={{paddingtop:"41%",position:"relative"}}>
     {videoData.otp && videoData.playbackInfo!==""  &&(
      <iframe src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=7UvP5QgdnAM79P69`} 
      style={{
      border:0,
      height:"360px",
      width:"700px",
      maxWidth:"100%"
    }} allowFullScreen="true" allow="encrypted-media" className='w-[90%]'></iframe>
      )}
      </div>
    </>
  )
}

export default CouresPlayer