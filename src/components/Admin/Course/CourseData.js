import toast from 'react-hot-toast';
import { styles } from '../../../app/styles/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle'
import React from 'react'

const CourseData = (props) => {
    const {active,setactive,benefits,setBenefits,prerequisites,setPrerequisites}=props;
    const ChangeBenefits=(index,value)=>{

        const updateBenefits=[...benefits];
        updateBenefits[index].title=value;
        setBenefits(updateBenefits)
        
    }
    const handleBenefits=()=>{

        setBenefits([...benefits,{title:""}]);
    }
    const ChangePrerequisties=(index,value)=>{

        const updateprerequisties=[...prerequisites];
        updateprerequisties[index].title=value;
        setPrerequisites(updateprerequisties)
            }

    const handlePrerequisties=()=>{
                
        setPrerequisites([...prerequisites,{title:""}])
        
        
        }
    const handlePrev=()=>{
        setactive(active-1)       
           }

    const handleNext=()=>{
       if(benefits[benefits.length-1]?.title!== ""&&prerequisites[prerequisites.length-1]?.title!== "" ){
       setactive(active+1);
       }
       else{
       toast.error('Please fill the fields for go to next!')
           }
           }

  return (
    <div className='w-[85%] m-auto mt-24 '>
         <div  >
            <label htmlFor="" className={styles.label}>What ara the benefits for students in this course ?</label>
            <br />
            {benefits.map((benefits,index)=>{return <input type="text" key={index} name='benefits' placeholder='You will be able to build a full stack LMS platform...'  required value={benefits.title} onChange={(e)=>ChangeBenefits(index,e.target.value)} className={styles.input}/>
            })}
             <AddCircleIcon onClick={handleBenefits} style={{margin:"10px 0px ",cursor:"pointer",width:"30px"}} className="   text-black     dark:text-white"/>
            </div>
         <div  >
            <label htmlFor="" className={styles.label}>What are the prerequisties for starting this course ?</label>
            <br />
            {prerequisites.map((prerequisites,index)=>{return <input type="text" key={index} name='prerequisites' placeholder='You need basic knowledge of MERN stack'  required value={prerequisites.title} onChange={(e)=>ChangePrerequisties(index,e.target.value)} className={styles.input}/>
            })}
             <AddCircleIcon onClick={handlePrerequisties} style={{margin:"10px 0px ",cursor:"pointer",width:"30px"}} className="   text-black     dark:text-white"/>
            </div>
            <div className=" w-full flex items-center justify-between ">
<button className='w-full 800px:w-[180px] bg-[#37a39a] font-Poppins  h-[40px] text-center text-[#fff] rounded mt-8 cursor-pointer' onClick={handlePrev}>
          Prev
        </button>
<button className='w-full 800px:w-[180px] bg-[#37a39a]  font-Poppins h-[40px] text-center text-[#fff] rounded mt-8 cursor-pointer' onClick={handleNext}>
          Next
        </button>
   
</div>
        
    </div>
  )
}

export default CourseData