'use client'
import React, { useEffect, useState } from 'react'
import { useUpdatePasswordMutation } from '../../../redux/features/auth/user/userApi';
import { styles } from '../../app/styles/styles';
import toast from 'react-hot-toast';

const ChangePassword = () => {
    let [updatePassword,{isSuccess,error}]=useUpdatePasswordMutation()
    const [user, setuser] = useState({
        oldpassword:"",
        password:'',
        cpassword:""
    
    });
    const ChangeHandler=(e)=>{
        setuser({...user,[e.target.name]:e.target.value});
    }
    const handle=async(e)=>{
        e.preventDefault();

        if(user.password!==user.cpassword){
            toast.error('Password do not Match');
        }
        else{
            
            await updatePassword({
                oldPassword:user.oldpassword,
                newPassword:user.password
            })
        }
        
    }
    useEffect(()=>{
        if(isSuccess){
            toast.success('Password change successfully')
            setuser({
                password:"",
                cpassword:"",
                oldpassword:""
            })
        }
        if(error){
            
            toast.error(error.data.message||' Your Password not Change')
        }
        },[isSuccess,error])
  return (
    <div>
         <div className=' w-full '>
        <h1 className=' text-[25px]  dark:text-white font-semibold  font-Poppins pb-4 text-black dark;text-white text-center'>Change Password</h1>
        <form action="" onSubmit={handle}>
            <div className=" flex items-center pt-3">

                    <div className="w-[90%] 800px:w-[80%] m-auto block pb-4">
                        <div className=" w-[100%] ">

                            <label htmlFor="" className=' block  font-Poppins dark:text-white text-black '>
                                Enter your old password
                            </label>
                            <input type="password" className={`${styles.input} !w-[100%] mb-4 800px:mb-0`} required  onChange={ChangeHandler} name='oldpassword'  value={user.oldpassword}/>

                        </div>
                        <div className=" w-[100%] pt-3">

                            <label htmlFor="" className=' block pb-1 font-Poppins dark:text-white text-black '>Enter your new password</label>
                            <input type="password" className={`${styles.input} !w-[100%] mb-4 800px:mb-0`} required name='password' onChange={ChangeHandler} value={user.password}  />



                        </div>
                        <div className=" w-[100%] pt-3">

                            <label htmlFor="" className=' block pb-1 dark:text-white text-black
                            font-Poppins '>Enter your confirm password</label>
                            <input type="password" className={`${styles.input} !w-[100%] mb-4 800px:mb-0`}   name='cpassword' onChange={ChangeHandler} value={user.cpassword} />



                        </div>
                            <button className=' w-full 800px:w-full h-[40px] border border-[#37a39a] text-black dark:text-white text-center rounded-[4px] mt-8 cursor-pointer font-Poppins  '>Update</button>

                    </div>

            </div>
                </form>

    </div>
    </div>
  )
}

export default ChangePassword