'use client'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {FcGoogle} from 'react-icons/fc'
import {AiOutlineEye,AiOutlineEyeInvisible,AiFillGithub} from 'react-icons/ai'
import { styles } from '../../app/styles/styles'
import { useLoginMutation } from '../../../redux/features/auth/authApi'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { signIn } from 'next-auth/react'

const Login = ({setroute,setOpen}) => {
   let [login,{isSuccess,error}] =useLoginMutation()
   
    const schema=Yup.object().shape({
        email:Yup.string().email("Invalid email").required('Please enter your email'),
        password:Yup.string().required('Please enter your password').min(6)
    })
    const [show, setShow] = useState(false);
    const formik=useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema:schema,
        onSubmit:async({email,password})=>{
            login({
                email,
                password
            })
        }
    })
    useEffect(()=>{
        if(isSuccess){
            toast.success('Login Successfully');
            
            setOpen(false);
            
        }
        if(error){
            toast.error(error.data.message);

        }

    },[isSuccess,error])
    const {errors,handleChange,touched,handleSubmit,values}=formik

  return (
    <div className=' w-full '>
        <h1 className={`${styles.title}`}>Login with ELearning</h1>
        <form onSubmit={handleSubmit}>
       <div className=' p-3'>
       <div>
         <label htmlFor="" className={`${styles.label}`}>Email</label>
            <input type="email" className={`${errors.email && touched.email && 'border-red-500 '} ${styles.input}`}
            onChange={handleChange} 
            name='email'
            value={values.email}

            placeholder='loginmail@gmail.com'/>
        {errors.email && touched.email && (
            <span className='text-red-500 pt-2 block'>{errors.email}</span>
        )}
         </div>
         <div className=' pt-3 w-full mt-5 relative mb-1'>
         <label htmlFor="" className={`${styles.label}`}>Password</label>
            <input type={!show?"password":"text"} className={`${errors.email && touched.password && 'border-red-500 '} ${styles.input}  `} 
            name='password'
             value={values.password} placeholder="enter your password"
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
       <button type='submit' className={`${styles.button} mt-5 text-white`}>Login</button>
       <br />
       <h1 className=' text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
        Or join with
       </h1>
       <div className=' flex items-center justify-center my-3'>
        <FcGoogle size={30} className=' cursor-pointer mr-2'
        onClick={()=>signIn("google")}
        />
        <AiFillGithub size={30} className=' cursor-pointer ml-2 text-black dark:text-white'
        onClick={()=>signIn("github")}
        />
       </div>
        <h1 className=' text-center  pt-2 font-Poppins text-[14px] text-black dark:text-white'>
            Not have any account? {" "}
            <span className='text-blue-500 pl-1 cursor-pointer' onClick={()=>setroute('Sign-up')}>Sign Up</span>
        </h1>
        <br />
       </div>
        </form>
    </div>
  )
}

export default Login