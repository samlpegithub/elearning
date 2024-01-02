import React from 'react'
import coder from '../../../public/coder.jpeg'
import men1 from '../../../public/men1.jpg'
import men2 from '../../../public/men2.jpg'
import women1 from '../../../public/women1.jpg'
import women2 from '../../../public/women2.jpg'
import women3 from '../../../public/women3.jpg'
import women4 from '../../../public/women4.jpg'
import business from '../../../public/business-img.png'
import Image from 'next/image'
import { styles } from '@/app/styles/styles'
import  ReviewCard from '../Review/ReviewCard'
export const reviews=[
    {name:"Awais Malik",
    avatar:coder,
    ratings:3,
    professtional:"Junoir Web Developer | Paskitan",
    comments:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit dolorem tempora, quas, pariatur ducimus provident, consequatur magnam quod vitae nihil sapiente possimus. Amet, culpa similique! Ut sequi quaerat neque omnis veniam? Eligendi quia voluptates sint alias fuga perspiciatis expedita facere esse repellat! Nulla, numquam labore quam debitis molestiae quo. Necessitatibus corporis eos id molestiae nemo maxime exercitationem sint iste modi distinctio, harum maiores fugit assumenda est! Odit ducimus dicta dolorum accusamus."},
    {name:"Arslan CR",
    avatar:men2,
    ratings:2,
    professtional:"Junoir Web Developer | Pakistan",
    comments:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit dolorem tempora, quas, pariatur ducimus provident, consequatur magnam quod vitae nihil sapiente possimus. Amet, culpa similique! Ut sequi quaerat neque omnis veniam? Eligendi quia voluptates sint alias fuga perspiciatis expedita facere esse repellat! Nulla, numquam labore quam debitis molestiae quo. Necessitatibus corporis eos id molestiae nemo maxime exercitationem sint iste modi distinctio, harum maiores fugit assumenda est! Odit ducimus dicta dolorum accusamus."},
    {name:"Laiba",
    avatar:women1,
    ratings:4,
    professtional:"Junoir Web Developer | Pakistan",
    comments:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit dolorem tempora, quas, pariatur ducimus provident, consequatur magnam quod vitae nihil sapiente possimus. Amet, culpa similique! Ut sequi quaerat neque omnis veniam? Eligendi quia voluptates sint alias fuga perspiciatis expedita facere esse repellat! Nulla, numquam labore quam debitis molestiae quo. Necessitatibus corporis eos id molestiae nemo maxime exercitationem sint iste modi distinctio, harum maiores fugit assumenda est! Odit ducimus dicta dolorum accusamus."},
    {name:"Fatima ",
    avatar:women2,
    ratings:5,
    professtional:"Junoir Web Developer | Pakistan",
    comments:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit dolorem tempora, quas, pariatur ducimus provident, consequatur magnam quod vitae nihil sapiente possimus. Amet, culpa similique! Ut sequi quaerat neque omnis veniam? "},
    {name:"Sana",
    avatar:women3,
    ratings:3,
    professtional:"Junoir Web Developer | Pakistan",
    comments:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit dolorem tempora, quas, pariatur ducimus provident, consequatur magnam quod vitae nihil sapiente possimus. Amet, culpa similique! Ut sequi quaerat neque omnis veniam? Eligendi quia voluptates sint alias fuga perspiciatis expedita facere esse repellat! Nulla, numquam labore quam debitis molestiae quo. Necessitatibus corporis eos id molestiae nemo maxime exercitationem sint iste modi distinctio, harum maiores fugit assumenda est! Odit ducimus dicta dolorum accusamus."},
    {name:"Sana",
    avatar:women4,
    ratings:4,
    professtional:"Junoir Web Developer | Pakistan",
    comments:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit dolorem tempora, quas, pariatur ducimus provident, consequatur magnam quod vitae nihil sapiente possimus. Amet, culpa similique! Ut sequi quaerat neque omnis veniam? Eligendi quia voluptates sint alias fuga perspiciatis expedita facere esse repellat! Nulla, numquam labore quam debitis molestiae quo. Necessitatibus corporis eos id molestiae nemo maxime exercitationem sint iste modi distinctio, harum maiores fugit assumenda est! Odit ducimus dicta dolorum accusamus."},
]
const Reviews = () => {

  return (
    <div className=' w-[90%] 800px:w-[90%] m-auto '>
     <div className='w-full 800px:flex items-center '>
            <div className='800px:w-[50%] w-full'>
            <Image  src={business} alt='business' width={600} height={700} />
            </div>
            <div className='800px:w-[50%]   w-full'>
            <h1 className={`${styles.title} 800px:text-[36px] `}>
                Our Student Are <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-800 '>Our Strength</span>{" "}
               <br />
                See What They say About Us
            </h1>
            <br />
            <p className={`${styles.label} text-justify`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium alias molestiae molestias dolorum, voluptatibus velit nulla harum eaque quaerat atque dicta repellendus blanditiis temporibus quia, rerum omnis facilis quo asperiores soluta minima necessitatibus. Magni cupiditate quisquam necessitatibus nihil? Voluptas quam soluta numquam,
            </p>

        </div>
        </div>
        <br />
        <br />
        <br />
        <div className='grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-10   800px:mt-5 '>

          
{reviews && reviews.map((item,index)=>{
    return (
        <ReviewCard item={item} key={index}/>
        
    )
})}
</div> 

        </div>
  )
}

export default Reviews