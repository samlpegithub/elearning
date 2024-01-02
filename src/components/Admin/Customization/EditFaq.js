import React, { useEffect, useState } from 'react'
import { useEditHeroDataMutation, useGetHeroDataQuery } from '../../../../redux/features/layout/layoutApi';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiMinus, HiPlus } from 'react-icons/hi';
import Loader from '../../Loader/Loader';
import { styles } from '../../../app/styles/styles';
import toast from 'react-hot-toast';

const EditFaq = () => {
  let {data,refetch,isLoading}=useGetHeroDataQuery("FAQ",{refetchOnMountOrArgChange:true});

  let [editHeroData,{isSuccess,error}]=useEditHeroDataMutation();
  
  const [questions, setquestions] = useState([]);

useEffect(()=>{
    if(data){
        console.log(data.layout.faq);
        setquestions(data.layout.faq);
    }
},[data])
useEffect(()=>{
    if(isSuccess){
      refetch();
      toast.success('FAQ Updated successfully');
    }
    if(error){
      toast.error(error.data.message);
    }
  },[isSuccess,error])

const toggleQuestion=(id)=>{
    let data=  setquestions((prev)=>{
     return  prev.map((q)=>{
   return  q._id===id?{...q,active:!q.active}:q}) }
   
   )
  }
  const handleQuestionChange=(id,value)=>{
    let data=  setquestions((prev)=>{
        return  prev.map((q)=>{
      return  q._id===id?{...q,question:value}:q}) })

}
const handleAnswerChange=(id,value)=>{
    let data=  setquestions((prev)=>{
        return  prev.map((q)=>{
      return  q._id===id?{...q,answer:value}:q}) });
}

const newFaqHandler=()=>{
    setquestions([...questions,{question:"",answer:""}]);

}
const areQuestionUnchanged=(originalQuestions,newQuestions)=>{
    
     return JSON.stringify(originalQuestions)===JSON.stringify(newQuestions) ? true : false

}

const isAnyQuestionEmpty=(questions)=>{
    return questions.some((q)=>{
        return q.question===""||q.answer===""
    })

}

const handleEdit=async()=>{
if(!areQuestionUnchanged(data?.layout?.faq,questions) && !isAnyQuestionEmpty(questions)){
   await editHeroData({
        type:"FAQ",
        faq:questions
    })

}
}
  return (
    <div>
    {isLoading?(
  <Loader/>
    ):
    <div className='w-full 800px:w-[80%] min-h-screen  m-auto  mt-[50px] 800px:mt-[100px]  '>
      <div className='mt-12'>
          <dl className='space-y-8'>
              {
                questions.map((q)=>{return <div key={q._id} 
                className={`${q._id!==questions[0]._id ? 'border-t border-gray-200 pt-5 cursor-pinter':" border-gray-200  cursor-pinter"}`}>
                <dt className='text-lg'>
                <button className='flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none ' onClick={()=>toggleQuestion(q._id)} >
                <input type="text" className={`${styles.input}   border-none`} value={q.question} onChange={(e)=>handleQuestionChange(q._id,e.target.value)} placeholder='Add Your questions...'/>
            <span className=' ml-6 flex-shrink-0 pt-4 ' >
            {q.active ?(<HiMinus className='h-6 w-6'/>):(<HiPlus className='h-6 w-6 '/>)}
            </span>
            </button>
            </dt>
                {q.active &&(
                    <dd cassName='mt-2 pr-12'>
                <input type="text" className={`${styles.input} border-none`}  value={q.answer} onChange={(e)=>handleAnswerChange(q._id,e.target.value)} placeholder='Add your answer...'/>
                <span className=' ml-6 flex-shrink-0'>
                <AiOutlineDelete className='dark:text-white text-black text-[18px] cursor-pointer' onClick={()=>{

                 let filter= setquestions((prevQuestion)=>{return prevQuestion.filter((item)=>item._id!==q._id)})
                 console.log(filter);
                }}/>
                </span>
                </dd>
                )}
                </div>
                  })
              }
          </dl>
          <br />
          <br />
          <IoMdAddCircleOutline className={`dark:text-white text-black text-[25px]  cursor-pointer`} onClick={newFaqHandler}/>
      </div>
     <div className='w-full flex justify-end'>
     <button className={`${styles.button} !w-[100px] !rounded-md !min-h-[40px] text-white bg-[#cccccc34] ${ areQuestionUnchanged(data?.layout?.faq ,questions) || isAnyQuestionEmpty(questions) ? "!cursor-not-allowed" : " !cursor-pointer bg-[#42d383]"}`}  
      onClick={
          areQuestionUnchanged(data?.layout?.faq?.questions,questions)|| isAnyQuestionEmpty(questions) ? ()=> null :handleEdit
      }>Save</button>
     </div>
      </div>}
  </div>
  )
}

export default EditFaq