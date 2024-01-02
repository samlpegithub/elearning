'use client'
import NavItem from '@/app/utils/NavItem';
import ThemeSwitcher from '@/app/utils/ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi'
import Link from 'next/link';
import CustomModel from '../app/utils/CustomModel'
import React, { useEffect, useState } from 'react'
import Login from '../components/Auth/Login'
import SignUp from '../components/Auth/SignUp';
import Verification from './Auth/Verification';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import avatar from '../../public/avatar.jpg'
import { useSession } from 'next-auth/react';
import { useLogOutQuery, useSocialAuthMutation } from '../../redux/features/auth/authApi';
import toast from 'react-hot-toast';
const Header = ({ open, setOpen, activeItem, route, setroute }) => {

    const [active, setactive] = useState(false);
    const [openSider, setopenSider] = useState(false);
    const [logout, setlogout] = useState(false);
    let [socialAuth, { isSuccess, error }] = useSocialAuthMutation()
    const {}=useLogOutQuery(undefined,{skip:!logout? true:false});
    const { user } = useSelector((state) => state.auth);
    let { data } = useSession();


    if (typeof window!=='undefined') {
        window.addEventListener('scroll',()=>{
          if (window.scrollY>85) {
        setactive(true);
        }
        else{
            setactive(false);
      
        }
        
        })}
       

useEffect(() => {
        if (!user) {
            if (data) {
                socialAuth({
                    name: data.user.name,
                    email: data.user.email,
                    avatar: data.user.image
                })

            }
            if(data===null){
                if (isSuccess) {
                    toast.success("Login Successfully");
                }
            }
            if(data===null){
                setlogout(true);

            }
        }
    }, [user, data, isSuccess])

    const handleClose = (e) => {
        if (e.target.id === 'screen') {
            setopenSider(false);
        }
    }
    return (
        <div className=' w-full relative'>
            <div className={`${ active ? "dark:bg-opacity-50  dark:bg-gradient-to-b dark:from-gray-900   dark:to-black fixed left-0 top-0   h-[80px] z-[80] shadow-xl border-b dark:border-[#ffffff1c]  transition duration-500 w-full dark:bg-black"
                : "w-full border-b  dark:bg-gradient-to-b from-gray-900  to-black dark:border-[#ffffff1c] h[80px] z-[80] dark:shadow"} `}>
                <div className='w-[95%] 800px:w-[97%] mt-auto h-full '>
                    <div className=' w-full h-[80px] flex items-center justify-between p-3'>
                        <div>
                            <Link href='/' className=' font-Poppins text-black dark:text-white font-[500] text-[25px] 800px:ml-10 ml-5 '>ELearning</Link>
                        </div>
                        <div className=' flex items-center justify-end '>
                            <NavItem
                                activeItem={activeItem}
                                isMobile={false}
                            />
                            <ThemeSwitcher />
                            {/* only for mobile */}
                            <div className=' 800px:hidden'>
                                <HiOutlineMenuAlt3 className='cursor-pointer text-black dark:text-white'
                                    size={27} onClick={() => setopenSider(true)} />
                            </div>
                            {
                                user ? (
                                    <Link href='/profile' >
                                        <Image src={user.avatar ? user.avatar.url : avatar} 
                                        width={30} height={30}
                                        className={`800px:block hidden w-[30px] h-[30px] rounded-full cursor-pointer  ${activeItem===5 ?" border-2 border-solid border-[#37a39a]": "border-none"}`} 
                                        style={{border:activeItem === 5?"2px solid #37a39a":"none"}}
                                           alt='avatar' />


                                    </Link>
                                )
                                    : <HiOutlineUserCircle className='800px:block hidden cursor-pointer text-black
                 dark:text-white' size={27} onClick={() => setOpen(true)} />
                            }
                            <div >
                            </div>

                        </div>
                    </div>
                    {openSider && (
                        <div className='fixed w-full h-screen top-0 left-0 z-[99999] dark:[unset] bg-[#00000024]' onClick={handleClose} id='screen'>

                            <div className='w-[70%] fixed z-[999999] ml-5 my-2 text-black dark:text-white'>
                                <div className='fixed w-[70%] h-screen top-0 right-0 z-[9999999999] bg-white dark:text-white dark:bg-slate-900 dark:bg-opacity-90 '>
                                    <NavItem isMobile={true} activeItem={activeItem} />

                                    {
                                user ? (
                                    <Link href='/profile'>
                                        <Image src={user.avatar ? user.avatar.url : avatar} 
                                        width={30} height={30}
                                        className='800px:hidden block w-[30px] h-[30px] rounded-full cursor-pointer border-[2px] border-solid border-[#37a39a] ml-4'  alt='avatar' />


                                    </Link>
                                )
                                    : <HiOutlineUserCircle className='800px:block hidden cursor-pointer text-black
                 dark:text-white' size={27} onClick={() => setOpen(true)} />
                            }
                                    <br />
                                    <br />
                                    <p className=' font-Poppins pl-2'>Copyright &copy; 2023 ELearning
                                    </p>
                                </div>

                            </div>


                        </div>
                    )}


                </div>

            </div>
            {route === 'Login' && (
                open && (

                    <CustomModel
                        open={open}
                        setOpen={setOpen}
                        setroute={setroute}
                        activeItem={activeItem}
                        Component={Login}



                    />

                )
            )}
            {route === 'Sign-up' && (
                open && (

                    <CustomModel
                        open={open}
                        setOpen={setOpen}
                        setroute={setroute}
                        activeItem={activeItem}
                        Component={SignUp}



                    />

                )
            )}
            {route === 'Verification' && (
                open && (

                    <CustomModel
                        open={open}
                        setOpen={setOpen}
                        setroute={setroute}
                        activeItem={activeItem}
                        Component={Verification}



                    />

                )
            )}
        </div>
    )
}

export default Header