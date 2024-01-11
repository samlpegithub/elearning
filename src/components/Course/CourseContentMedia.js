'use client'
import { styles } from '@/app/styles/styles'
import CouresPlayer from '@/app/utils/CouresPlayer'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai'
import avatar from '../../../public/banner.webp'
import toast from 'react-hot-toast'
import { useAddAnswerInQuestionMutation, useAddNewQuestionMutation, useAddReplyInReviewMutation, useAddReviewInCourseMutation, useGetCourseDetailQuery } from '../../../redux/features/courses/courseApi'
import { format } from 'timeago.js'
import { BiMessage } from 'react-icons/bi'
import { VscVerifiedFilled } from 'react-icons/vsc'
import Ratings from '@/app/utils/Ratings'
import socketIO from 'socket.io-client'


const CourseContentMedia = ({activeVideo,setActiveVideo,data,id,user,refetch}) => {

 

    const ENDPOINT=process.env.NEXT_PUBLIC_SOCKET_URI
    const socketId=socketIO(ENDPOINT,{transports:['websocket']})

  const [activeBar, setactiveBar] = useState(0);
  const [question, setquestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");

  const [review, setReview] = useState("");
  const [rating, setrating] = useState(1);
  
  const [isReviewReply, setisReviewReply] = useState(false);
  const [reply, setreply] = useState("")
  const [reviewId, setreviewId] = useState("")



const {data:courseData,refetch:courseRefetch}=useGetCourseDetailQuery(id,{refetchOnMountOrArgChange:true});  

const isReviewExist=courseData?.course?.reviews?.find((item)=>item.user._id===user._id);
let [addNewQuestion,{isSuccess,error,isLoading:questionCreationLoading}]=useAddNewQuestionMutation();

let [addAnswerInQuestion,{isLoading:answerLoading,isSuccess:answerCreationSuccess,error:answerError}]=useAddAnswerInQuestionMutation({})
  
let [addReviewInCoures,{isLoading:reviewLoading,isSuccess:reviewCreationSuccess,error:reviewError}]=useAddReviewInCourseMutation({});

let [addRepleyInReview,{isLoading:repleyLoading,isSuccess:addRepleySuccess,error:RepleyError}]=useAddReplyInReviewMutation()

const handleQustion=async()=>{
    if(question.length===0){
        toast.error("Question can't be empty")
    }else{
      await addNewQuestion({
            question,
            courseId:id,
            contentId:data[activeVideo]._id
        })
    }
  }
  const handleAnswerSubmit=async()=>{
    if(answer.length===0){
        toast.error("Answer can't be empty")
    }else{
        await addAnswerInQuestion({
            answer,
            questionId,
            courseId:id,
            contentId:data[activeVideo]._id
        })
        setAnswer("");
    }

  }
  const handleReviewSubmit=async()=>{
    if(review.length===0){
        toast.error("Review can't be empty");
    }
    else{
       
        await addReviewInCoures({
            courseId:id,
            review,
            rating
        })

    }

  }
  const handleReplySubmit=async()=>{
    if(reply.length===0){
        toast.error("Reply can't be empty");
    }else{
        console.log({ courseId:id,reviewId,comment:reply})
        addRepleyInReview({
          courseId:id,
          reviewId,
          comment:reply

        })

    }
  }
useEffect(()=>{
    if(isSuccess){
        setquestion("");
        refetch();
        console.log('notification');
        socketId.emit('notification',{
            title:"New Question Recieved",
            message:`you have a new question in ${data[activeVideo].title}`,
            userId:user._id
          })
        toast.success("Qusetion Added Successfully...");
    }
    if(answerCreationSuccess){
        setAnswer("");
        refetch();
        toast.success("Answer Added Successfully");
        if(user.role!=='admin'){
            socketId.emit('notification',{
                title:"New Reply Recieved",
                message:`you have a new question reply in ${data[activeVideo].title}`,
                userId:user._id
              })
        }
    }
    
    if(error){
        toast.error(error.data.message);

    }
    if(answerError){
        toast.error(answerError.data.message);
    }

},[isSuccess,error,answerCreationSuccess,answerError]);

useEffect(()=>{
    if(reviewCreationSuccess){
        setReview("");
        courseRefetch();
        socketId.emit('notification',{
            title:"New Review Recieved",
            message:`you have a new Review in ${data[activeVideo].title}`,
            userId:user._id
          })
        toast.success("Review Added Successfully");
    }
    if(reviewError){
        toast.error(reviewError.data.message);

    }
    if(addRepleySuccess){
        setreply("");
        courseRefetch();
        toast.success("Reply added Successfully");
    }
    if(RepleyError){
        toast.error(RepleyError.data.message);

    }

},[reviewError,reviewCreationSuccess,addRepleySuccess,RepleyError])

  return (
    <div className=' w-[95%] 800px:w-[89%]   py-4 m-auto  '>
        <CouresPlayer
         title={data[activeVideo].title}
         videoUrl={data[activeVideo].videoUrl}
        />
        <div className='w-full flex justify-between !my-3 '>
            <button className={`${styles.button} !w-[unset] text-white !min-h-[40px] !py-[unset] ${activeVideo===0 && "!cursor-no-drop opacity-[0.8]"}`} onClick={()=>setActiveVideo(activeVideo===0 ? 0 : activeVideo - 1)}>
                <AiOutlineArrowLeft className=' mr-2'/>
                Prev Lesson
            </button>
            <button className={`${styles.button} text-white !min-h-[40px] !py-[unset] 
            ${data.length-1===activeVideo && "!cursor-no-drop opacity-[0.8]"} !w-[unset]`}
             onClick={()=> setActiveVideo(data && data.length-1===activeVideo ? activeVideo : activeVideo + 1)}>
                Next Lesson
            <AiOutlineArrowRight className='ml-2'/>
            </button>
        </div>
        <h1 className='pt-2 text-[25px] font-[600] text-black dark:text-white'>{data[activeVideo].title}</h1>
        <br />
        <div className=' w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner'>
            {["Overview","Resources","Q&A","Reviews"].map((data,index)=>{
                return (
                <h1 key={index} className={`800px:text-[20px]  !cursor-pointer ${
                    activeBar ===index ?' text-red-500 ':"text-black dark:text-white"
                }`} onClick={()=>setactiveBar(index)}>{data}</h1>)
                
            })}
            </div>
            <br />
            {activeBar ===0 && (
             <div className='w-full text-justify'>
                 <p className=' text-[18px] whitespace-pre-line mb-3 text-black dark:text-white'> {data[activeVideo].description}</p>
             </div>
            )}
            {activeBar ===1 && (
                    <div>
                        {data && data[activeVideo].link.map((item,index)=>{
                            return (
                                <div className=' mb-5' key={index}>
                                    <h1 className=' 800px:text-[20px] 800px:line-block text-black dark:text-white'>
                                        {item.title && item.title + ":"}
                                <a href={item.url} className=' line-block text-[#4395c4] 800px:text-[20px] 800px:pl-2'>
                                    {item.url}
                                </a>
                                    </h1>
                                </div>
                                
                            )
                        })}
                    </div>
                    
                )}
                {activeBar ===2 && (

                    <>
                    {/*  Quesiton ask*/}
                    <div className='w-full flex'>
                        <Image
                        src={user.avatar ? user?.avatar?.url:avatar}
                        width={50} height={50} alt='avatar' className=' rounded-full w-[50px] h-[50px] object-cover'
                        />
                        <textarea value={question} onChange={(e)=>setquestion(e.target.value)}
                            cols={40}
                            rows={5}
                            placeholder='Write your questions ...'
                            className='outline-none  bg-transparent ml-3 border border-slate-500 dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins  text-black dark:text-white'/>        
                    </div>
                    <div className=' w-full flex justify-end'>

                    <button className={`${styles.button} !w-[120px] !rounded-sm !h-[40px] text-white text-[16px] mt-5 ${questionCreationLoading &&" cursor-not-allowed"}`}
                     onClick={questionCreationLoading ? ()=>{}: handleQustion}>
                            Submit
                        </button>
                        </div>
                        <br />
                        <br />
                    <div className=' w-full h-[1px] bg-slate-500 dark:bg-[#ffffff3b]'></div>
                    {/* Question reply  */}
                    <div>
                        <CommentReply
                        data={data}
                        user={user}
                        handleAnswerSubmit={handleAnswerSubmit}
                        answer={answer}
                        setAnswer={setAnswer}
                        activeVideo={activeVideo}
                        questionId={questionId}
                        setQuestionId={setQuestionId}
                        answerLoading={answerLoading}


                        />
                    </div>

                    </>
                    

                )}
                {activeBar===3 && (
                    <>
                    {!isReviewExist  && (
                        <>
                        <div className='w-full flex'>
                        <Image
                        src={user.avatar ? user?.avatar?.url:avatar}
                        width={50} height={50} alt='avatar' className=' rounded-full w-[50px] h-[50px] object-cover'
                        />
                        <div className=' w-full'>
                            <h5 className=' dark:text-white text-black pl-3 text-[20px] font-[500'>Give a Rating  <span className=' text-red-500'>*</span></h5>
                              <div className=' w-full flex ml-2 pb-2'>

                        {[1,2,3,4,5].map((i,index)=>{
                    return (
                        rating>=i ? (
                            <AiFillStar size={25}  className=' mr-1 cursor-pointer ' key={index} color='rgb(246,186,0)' onClick={()=>setrating(i)}/>
                        ):(
                               <AiOutlineStar size={25} className=' mr-1 cursor-pointer ' key={index} color='rgb(246,186,0)' onClick={()=>setrating(i)}/> 
                               )
                    )
                }

                )}
                        </div>
                        <textarea value={review} onChange={(e)=>setReview(e.target.value)}
                            cols={40}
                            rows={5}
                            placeholder='Write your comment ...'
                            className='outline-none  bg-transparent ml-3 border border-slate-500 dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins  text-black dark:text-white'/>

                       
                        </div>
                        </div>
                        <div className=' w-full flex justify-end'>

                    <button className={`${styles.button} !w-[120px] !rounded-sm !h-[40px] text-white text-[16px] mt-5 ${reviewLoading &&" cursor-not-allowed"}`}
                     onClick={reviewLoading ? ()=>{}: handleReviewSubmit}>
                            Submit
                        </button>
                        </div>
                        <br />
                        <br/>
                        </>
                    )}

                    <div className=' w-full h-[1px] bg-[#ffffff3b]'></div>
                    <div className='w-full'>
                    {
                    (courseData?.course?.reviews && [...courseData?.course?.reviews].reverse())
                    .map((item,index)=>{
                        console.log(item)
                   return (
                    <div key={index}>
                    <div className=' w-full my-5'>
                    <div className=' w-full flex '>
                    <Image 
                src={
                item.user ? item?.user.avatar.url : avatar}
                width={50} height={50} alt='avatar' className=' rounded-full w-[50px] h-[50px] border border-black dark:border-none object-cover'/>
                    <div className='ml-2'>
                    <h1 className=' text-[20px] text-black dark:text-white'>
                        {item && item?.user?.name}</h1>
                      
                        
                        <Ratings rating={item.rating}/>
                        <p className=" dark:text-[#fff] text-[#000]">{item.comment}</p>
                        <small className=' dark:text-[#ffffff83] text-[#000000b8]'>
                            {format(item.createdAt)} *</small>

                    </div>
                   
                    </div>
                   <div className=' pl-12 flex  w-full'>
                   {user.role==='admin' && item.commentReplies?.length === 0 && (
                        <div className=' w-full flex'>
                        <span className={`${styles.label}  cursor-pointer`} onClick={()=>{setisReviewReply(!isReviewReply)
                        setreviewId(item._id)    
                    }
                        }>
                            Add Reply
                        </span>
                    <span className='pl-2'> <BiMessage size={20} className=' cursor-pointer text-[#000000b8] dark:text-[#ffffff83] '/></span>
                    <span className=' pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]'>
                    {item.commentReplies.length}
                </span>
                        </div>
                        
                    )}  
                   </div>
                    {isReviewReply && reviewId===item._id  &&(
                        <div className={` w-full flex relative dark:text-white text-black ${isReviewReply && "mb-3"}`}>
                        <input
                         type="text"
                        placeholder=' Enter your answer...'
                        value={reply}
                        onChange={(e)=>setreply(e.target.value)} 
                        name='input'
                        className={` block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#000000]  dark:border-[#fff]  p-[5px] w-[95%] 
                        ${repleyLoading &&"cursor-not-allowed"}
                        `} 
                         />
                         <button  type='submit' className=' absolute right-0 bottom-1 text-black dark:text-white bg-blue-500 border-none font-Poppins font-[500]  px-3 py-1 rounded-sm dark:border-[#fff] border  border-black'
                         onClick={handleReplySubmit}
                         disabled={reply.length===0 ||repleyLoading}
                         >Submit</button>
                    </div>
                    )}
                    {item.commentReplies.map((item)=>{
                        return (
                       <div className=' 800px:pl-16 pl-16'>
                        <div className='w-full flex mb-2'>
                <div className=' w-[50px] h-[50px]'>
                <Image 
                src={
                item?.user ?item.user?.avatar?.url:
                avatar}
                width={50} height={50} alt='avatar' className=' rounded-full w-[50px] h-[50px] border border-black dark:border-none object-cover'/>    
                </div>
                <div className=' pl-3'>
                   <div className=' w-full flex'>
                   <h1 className=' text-[20px] text-black dark:text-white'>
                        {item && item?.user?.name}
                    </h1> 
                    {item.user.role==='admin' && <VscVerifiedFilled className=' !text-[#0095f6] ml-2 text-[20px]'/>}
                   </div>
                        <p className=' text-black dark:text-white'>{item.comment}</p>
                        <small className=' dark:text-[#ffffff83] text-[#000000b8]'> 
                        {format(item.createdAt)} *</small>
                </div>
               </div>
                       </div> 
                    )})}

                    </div>
                    </div>
                )
                }
                )
                }
            </div>
    </>
                )}
</div>
  )}
export const CommentReply=({
    data,user,handleAnswerSubmit,answer,setAnswer,questionId,setQuestionId,activeVideo,answerLoading})=>{
    return (
     <>
     <div className="w-full my-3">
        {data[activeVideo].questions.map((item,index)=>{
            return (
                <CommentItem
                key={index}
                data={data}
                activeVideo={activeVideo}
                item={item}
                user={user}
                index={index}
                answer={answer}
                setAnswer={setAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
                questionId={questionId}
                setQuestionId={setQuestionId}
                answerLoading={answerLoading}
                />
            )
        })}
     </div>
     
     </>
 
    ) 
 }
 export const CommentItem=({data,activeVideo,item,index,answer,setAnswer,handleAnswerSubmit,questionId,setQuestionId,answerLoading})=>{
    const [replyactive, setReplyActive] = useState(false);

    return (
        <>
        <div className='my-4'>
        <div className=' flex mb-2'>
                <div className=' w-[50px] h-[50px]'>
                <Image 
                src={
                item?.user ?item.user?.avatar?.url:
                avatar}
                width={50} height={50} alt='avatar' className=' rounded-full w-[50px] h-[50px] border border-black dark:border-none object-cover'/>    
                </div>
                <div className=' pl-3'>
                    <h1 className=' text-[20px] text-black dark:text-white'>
                        {item && item?.user?.name}
                        <p>{item.question}</p>
                        <small className=' dark:text-[#ffffff83] text-[#000000b8]'>{item.createdAt ? format(item.createdAt) :""}*</small>
                    </h1>
                </div>
               </div>
               <div className=' w-full flex'>
                <span className=' 800px:pl-16 pl-16 dark:text-[#ffffff83] text-[#000000b8] cursor-pointer mr-2' onClick={()=>{
                    setReplyActive(!replyactive)
                    setQuestionId(item._id)
                    }}>
                    {!replyactive ? item.questionReplies.length!==0 ? "All Replies":"Add Reply" :"Hide Replies"}
                </span>
                <BiMessage size={20} className=' cursor-pointer text-[#000000b8] dark:text-[#ffffff83]'/>
                <span className=' pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]'>
                    {item.questionReplies.length}
                </span>
               </div>
               {replyactive && questionId===item._id && (
                <>
                {item.questionReplies.map((item)=>{

                    return(
                        <div className='w-full pt-2 flex 800px:ml-16 text-black dark:text-white'>
                <Image 
                src={
                item?.user ?item.user?.avatar?.url:avatar}
                width={50} height={50} alt='avatar' className=' rounded-full w-[50px] h-[50px] border border-black dark:border-none object-cover'/>
                 <div className=' pl-3'>
                    <h1 className=' text-[20px] text-black dark:text-white'>
                       <div className=' flex  items-center'>
                       {item && item?.user?.name}
                       {item.user.role==='admin' && <VscVerifiedFilled className=' !text-[#0095f6] ml-2 text-[20px]'/>}
                       </div>
                        <p>{item.answer}</p>
                        <small className=' dark:text-[#ffffff83] text-[#000000b8]'>{item.createdAt ? format(item.createdAt) :""}*</small>
                    </h1>
                </div>


                        </div>
                    )
                })}
                 <>
               <div className=' w-full flex relative dark:text-white text-black'>
                        <input
                         type="text"
                        placeholder=' Enter your answer...'
                        value={answer}
                        onChange={(e)=>setAnswer(e.target.value)} 
                        name='input'
                        className={` block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:border-[#fff]  p-[5px] w-[95%] ${answerLoading &&"cursor-not-allowed"}`} 
                         />
                         <button  type='submit' className=' absolute right-0 bottom-1 text-black dark:text-white bg-blue-500 border-none font-Poppins font-[500]  px-3 py-1 rounded-sm dark:border-[#fff] border  border-black'
                         onClick={handleAnswerSubmit}
                         disabled={answer.length===0 ||answerLoading}
                         >Submit</button>
                    </div>
               </>
                </>
                
               )}
              
        </div>
        </>

    )
 }
export default CourseContentMedia
