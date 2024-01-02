'use client'
import { styles } from '../../app/styles/styles'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { useActivationMutation } from '../../../redux/features/auth/authApi'

const Verification = ({ setroute }) => {
  const {token} = useSelector((state)=>state.auth);
const[activation,{isSuccess,error}]=useActivationMutation()
    const [active, setactive] = useState(0)
    const [invalidError, setinvalidError] = useState(false);
    const [VerifyNumber, setVerifyNumber] = useState({
        0: "",
        1: "",
        2: "",
        3: "",
    })
    const VerificationHandler = async () => {
        const verificationCode=Object.values(VerifyNumber).join("");
        // console.log(verificationCode);
        if(verificationCode.length !==4){
            setinvalidError(true)

        }else{
            console.log(verificationCode);
            await activation({
                activation_token:token,
                activation_code:verificationCode
            })
            
        }


    }

    let first = [
        useRef(1),
        useRef(2),
        useRef(3),
        useRef(4),
    ];

    const handleInputChange = (index,value) => {
        setinvalidError(false);

        const newNumber={ ...VerifyNumber, [index]: value};
        setVerifyNumber(newNumber)
        
            if (value === '' && index > 0) {
            first[index-1].current.focus();
            
            
        } else if (value.length === 1 && index < 3) {
            first[index+1].current.focus();

        }
    }
    useEffect(()=>{
        if(isSuccess){
            toast.success('Account activated Successfully');
            setroute("Login")
        }
        if(error){
            console.log(error);
            toast.error(error.message);
        }
            },[isSuccess,error])
    
    return (
        <div>

            <h1 className={`${styles.title}`}>
                Verify Your Account
            </h1>
            <br />
            <div className='w-full   flex items-center justify-center mb-2'>
                <div className=' w-[80px] h-[80px] rounded-full bg-blue-600 items-center flex justify-center'>
                    <VscWorkspaceTrusted size={40} className=' text-white' />
                </div>
            </div>
            <br />
            <div className='1100px:w-[90%] m-auto flex items-center justify-around'>
                {Object.keys(VerifyNumber).map((item, index) => {
                    return (
                        <input type="number" key={index} className={`
                border-black border-4  border-solid  w-[65px] h-[65px] bg-transparent rounded-[10px] flex items-center text-black dark:text-white font-Poppins text-[18px] outline-none text-center  ${invalidError ? " effect border-red-500 " : " dark:border-white dark:border-4 dark:border-solid border-black "} justify-center `}
                            maxLength={1}
                            ref={first[index]}
                            value={VerifyNumber[item]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    )
                })}
            </div>
            <br />
            <br />
            <div className='w-full flex justify-center'>
                <button className={`${styles.button} text-white mx-2`} onClick={VerificationHandler}>Verify OTP</button>

            </div>
            <br />
            <h1 className=' font-Poppins flex justify-center text-center pt-3 text-black dark:text-white '>
                Go back to sign in? <span className=' text-blue-500 ml-1 cursor-pointer' onClick={() => setroute('Login')}> sign in</span>
            </h1>
            <br />
        </div>
    )
}

export default Verification