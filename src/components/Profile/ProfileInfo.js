import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import avatarDefult from '../../../public/avatar.jpg'
import { styles } from '../../app/styles/styles'
import { useEditProfileMutation, useUpdateAvatarMutation } from '../../../redux/features/auth/user/userApi'
import { useLoadUserQuery } from '../../../redux/features/api/apiSlice'
import toast from 'react-hot-toast'
const ProfileInfo = ({user,avatar}) => {
const [name, setname] = useState(user && user.name);
// const [loadUser, setLoadUser] = useState(false); 

let [updateAvatar,{isSuccess:updateSuccess,error}]=useUpdateAvatarMutation();
let [editProfile,{isSuccess:editProfileSuccess,error:editProfileError}]=useEditProfileMutation();

const {refetch}=useLoadUserQuery(undefined,{refetchOnMountOrArgChange:true})

const imageHandler=(e)=>{

    const fileReader=new FileReader();
    fileReader.onload=async()=>{
        if(fileReader.readyState===2){
        const avatar=fileReader.result;
        console.log(avatar);
        updateAvatar(avatar);
        
        }
    }
    fileReader.readAsDataURL(e.target.files[0]);
}
useEffect(()=>{
    if(updateSuccess){
        refetch();
          toast.success('Profile Update Successfully');
        }
        if(editProfileSuccess){
            refetch();
            toast.success('Profile Update Successfully');

    }
    if(error || editProfileError){
        toast.error(error.data.message ||editProfileError.data.message);
        
    }
  

},[updateSuccess,error,editProfileSuccess,editProfileError]);

const handle=(e)=>{
    e.preventDefault();
    if(name !==""){
        editProfile({
            name,
            email:user.email
        })
    }

}

    return (
    <div>
          <div className=' w-full  flex justify-center'>
                <div className=' relative'>
                
                    <Image src={ user.avatar || avatar ? user.avatar.url || avatar : avatarDefult} width={120} height={120} className='w-[120px] h-[120px] rounded-full border-[3px] border-solid border-[#37a39a] ' alt='avatarImage' priority={true} />
                    <input type="file" name='' className='hidden' accept='image/png,image/jpeg,image/jpg,image/webp' id='avatar'  onChange={imageHandler}/>
                    <label htmlFor="avatar" className=' w-[30px] bg-slate-900 h-[30px] rounded-full absolute  items-center  right-3 bottom-2  cursor-pointer text-white '>
                        <AiOutlineCamera size={23} className=' z-1 items-center flex  justify-center ' />
                    </label>
                </div>
                </div>
                <br />
                <br />
                <div className="w-full pl-6 8000px:pl-10">
                <form action="" onSubmit={handle}>
                    <div className=" 800px:w-[60%] m-auto block pb-4">
                        <div className=" w-[100%] ">

                            <label htmlFor="" className=' block pb-1 dark:text-white text-black '>Full  Name</label>
                            <input type="text" className={`${styles.input} !w-[100%] mb-4 800px:mb-0`} required value={name} onChange={(e) => setname(e.target.value)} />

                        </div>
                        <div className=" w-[100%] pt-3">

                            <label htmlFor="" className=' block pb-1 dark:text-white text-black '>Email Address</label>
                            <input type="text" className={`${styles.input} !w-[100%] mb-4 800px:mb-0`} required readOnly value={user.email} />
                            <button className=' w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-black dark:text-white text-center rounded-md mt-8 cursor-pointer  font-Poppins '>Update</button>

                        </div>
                    </div>

                </form>

            </div>
    </div>
  )
}

export default ProfileInfo