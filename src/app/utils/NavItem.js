import Link from 'next/link'
import React from 'react'

const NavItem = ({ activeItem, isMobile }) => {
   const NavItemData = [
      {
         name: "Home",
         url: "/"
      },
      {
         name: "Courses",
         url: "/courses"
      },
      {
         name: "About",
         url: "/about"
      },
      {
         name: "Policy",
         url: "/policy"
      },
      {
         name: "FAQ",
         url: "/faq"
      },
   ]

   return (
      <>
         <div className=' hidden 800px:flex'>
            {
               NavItemData && NavItemData.map((item, index) => {
                  return (
                     <Link href={item.url}
                        className={activeItem === index ? 'font-Poppins dark:text-[#37a39a] text-[crimson] font-[400] text-[20px] 800px:p-3' : "font-Poppins text-black dark:text-white font-[400] text-[20px] 800px:p-3"}
                        key={index}>{item.name}</Link>
                  )
               })
            }
            </div>
            {
               isMobile && (
                  <div className='800px:hidden flex mt-5'>
                     <div className='w-full py-6'>
                   <div className=' text-center'>
                   <Link href={'/'}>
                   <span className=' text-[25px]  font-Poppins font-[500] text-black dark:text-white'>ELearning</span>           
                </Link>
                   </div>
                        {NavItemData && NavItemData.map((item, index) => {
                           
                           return (
                              <Link href={item.url}
                                 className={`${activeItem === index ? 'font-Poppins dark:text-[#37a39a] text-[crimson] ' : "font-Poppins text-black dark:text-white"} block py-3 text-[18px] px-6 font-Poppins font-[400]`}
                                 key={index}>{item.name}</Link>
                           )
                        })}
                  </div>
               
         </div>
               )
            }

      </>
   )
}

export default NavItem