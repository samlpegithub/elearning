'use client'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {FcGoogle} from 'react-icons/fc'
import {AiOutlineEye,AiOutlineEyeInvisible,AiFillGithub} from 'react-icons/ai'
import { styles } from '../../app/styles/styles'
import { useRegisterMutation } from '../../../redux/features/auth/authApi'
import toast from 'react-hot-toast'


const SignUp = ({setroute}) => {
const [register,{data,error,isSuccess}]=useRegisterMutation()

    const schema=Yup.object().shape({
        name:Yup.string().required('Please enter your name'),
        email:Yup.string().email("Invalid email").required('Please enter your email'),
        password:Yup.string().required('Please enter your password').min(6)
    })
    const [show, setShow] = useState(false);
    useEffect(()=>{
if(isSuccess){
    const message=data.message ||"Registration Successfully"
    toast.success(message);
    setroute("Verification")
}
if(error){
    console.log(error);
    toast.error(error.data.message);
}
    },[isSuccess,error])
    const formik=useFormik({
        initialValues:{
            name:"",
            email:"",
            password:""
        },
        validationSchema:schema,
        onSubmit:async({email,password,name})=>{
            const data={
                email,
                name,
                password
            }
            await register(data);
        }
    })
    const {errors,handleChange,touched,handleSubmit,values}=formik

  return (
    <div className=' w-full '>
        <h1 className={`${styles.title}`}>Join to ELearning</h1>
        <form onSubmit={handleSubmit}>
       <div className=' p-2'>
       <div>
         <label htmlFor="" className={`${styles.label}`}>Name</label>
            <input type="name" className={`${errors.name && touched.name && 'border-red-500 first-letter'}  ${styles.input}`}
            onChange={handleChange} 
            name='name'
            value={values.name}

            placeholder='Enter your Name'/>
        {errors.name && touched.name && (
            <span className='text-red-500 pt-2 block'>{errors.name}</span>
        )}
         </div>
       <div className='mt-3'>
         <label htmlFor="" className={`${styles.label}`}>Email</label>
            <input type="email" className={`${errors.name && touched.email && 'border-red-500 first-letter'}  ${styles.input}`}
            onChange={handleChange} 
            name='email'
            value={values.email}

            placeholder='Enter your Email'/>
        {errors.email && touched.email && (
            <span className='text-red-500 pt-2 block'>{errors.email}</span>
        )}
         </div>
         <div className='  w-full mt-3 relative mb-1'>
         <label htmlFor="" className={`${styles.label}`}>Password</label>
            <input type={!show?"password":"text"} className={`${errors.password && touched.password && 'border-red-500 '} ${styles.input}  `} 
            name='password'
             value={values.password} placeholder="create your stronge password"
             onChange={handleChange}
            />
        
           {!show ? 
            <AiOutlineEyeInvisible className='absolute right-2  bottom-2  z-1 cursor-pointer  text-black dark:text-white' size={25} onClick={()=>setShow(true)}/>
            :
             <AiOutlineEye className='absolute right-2  bottom-2   z-1 cursor-pointer  text-black dark:text-white' size={25} onClick={()=>setShow(false)}/>}
          
         </div>
             {errors.password && touched.password && (
            <span className='text-red-500 pt-2 block' >{errors.password}</span>
        )}
       <button type='submit'  className={`${styles.button} mt-5 text-white`}>Sign Up</button>
       <br />
       <h1 className=' text-center pt-2 font-Poppins text-[14px] text-black dark:text-white'>
        Or join with
       </h1>
       <div className=' flex items-center justify-center my-3'>
        <FcGoogle size={30} className=' cursor-pointer mr-2'/>
        <AiFillGithub size={30} className=' cursor-pointer ml-2 text-black dark:text-white'/>
       </div>
        <h1 className=' text-center  pt-2 font-Poppins text-[14px] text-black dark:text-white'>
            Already have an account? {" "}
            <span className='text-blue-500 pl-1 cursor-pointer' onClick={()=>setroute('Login')}>Sign In</span>
        </h1>
        <br />
       </div>
        </form>
    </div>
  )
}

export default SignUp