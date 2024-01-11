import React from 'react'
import { useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdOutlineOndemandVideo } from 'react-icons/md';

const CourseContentList = ({data,isDemo,activeVideo,setActiveVideo}) => {
    const [visibleSection, setvisibleSection] = useState(new Set());
    
    const videoSection=[...new Set(data?.map((item)=>item.videoSection))]
    
    const toggleSection=(section)=>{
        const newVisibleSections=new Set(visibleSection);
        if(newVisibleSections.has(section)){
            newVisibleSections.delete(section);
        }else{
            
            newVisibleSections.add(section);
        }
        setvisibleSection(newVisibleSections)
    }
    let totalCount=0;

  return (
    <div className={` mt-[15px] w-full ${!isDemo && "ml-[-30px] sticky top-24 z-30 "}`}>
        {videoSection.map((section)=>{
            const isSectionVisible=visibleSection.has(section);

            //filter video by section 
            const sectionVideos=data.filter((item)=>item.videoSection===section);
            const sectionVideoCount=sectionVideos.length;

            let sectionVideoLength=sectionVideos.reduce((first,two)=>{
                return first+two.videoLength
              },0);  
              const sectionStartIndex=totalCount;
              totalCount += sectionVideoCount;
              
              const sectionContentHours=sectionVideoLength/60;

            return (
                <div className={`${isDemo && " border-b border-[#ffffff8e]"} ${!isDemo && "border-b dark:border-[#ffffff8e] border-black"}  pb-2`} key={section}>
                    <div className=' w-full flex'>
                        {/* Render video Section  */}
                        <div className=' w-full flex justify-between items-center '>
                            <h2 className=' text-[22px] cursor-pointer text-black dark:text-white '>{section}</h2>
                            <button className=' text-black dark:text-white mr-4 cursor-pointer' onClick={()=>toggleSection(section)}>
                                {isSectionVisible ? (<BsChevronUp size={20}/>):(
                                    <BsChevronDown size={20}/>

                                )}
                            </button>
                        </div>
                    </div>
                    <h5 className={` text-black dark:text-white `}>{sectionVideoCount } Lessons .{" "}
                    {sectionVideoLength <60 ? sectionVideoLength: sectionContentHours.toFixed(2)}{" "}
                    {sectionVideoLength > 60 ?"hours":"minutes"}
                    </h5>
                    <br />
                    {!isSectionVisible && (
                        <div className=' w-full'>
                            {sectionVideos.map((item,index)=>{
                                const videoIndex=sectionStartIndex + index;
                                const contentLength=item.videoLength / 60;
                                return (
                                    <div className={` w-full ${videoIndex ===activeVideo ? "bg-slate-800":""} cursor-pointer transition-all p-2`} key={index} 
                                    onClick={()=>isDemo ? null : setActiveVideo(videoIndex)}>
                                        <div className=' flex items-start'>
                                            <div>
                                                <MdOutlineOndemandVideo size={25} className=' mr-2' color='#1cdada'/>
                                            </div>
                                            <h1 className=' text-black dark:text-white text-[18px] inline-block break-words'>{item.title}</h1>
                                        </div>
                                        <h5 className='text-black dark:text-white pl-8'>{item.videoLength > 60? contentLength.toFixed(2):item.videoLength}{" "}
                                        {item.videoLength > 60?"hours":"minutes"}
                                        </h5>
                                    </div>
                                )


                            })}
                        </div>
                    )}


                </div>

            )
        })}
    </div>
  )
}

export default CourseContentList