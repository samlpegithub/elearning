import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState ,useEffect} from 'react'
import { useLoadUserQuery } from '../../../redux/features/api/apiSlice';
import { useCreateOrderMutation } from '../../../redux/features/orders/ordersApi';
import { styles } from '@/app/styles/styles';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import socketIO from 'socket.io-client'

const CheckOutForm = ({data,setOpen,user}) => {
  let stripe=useStripe();
let elements=useElements();

const [message, setMessage] = useState("")
const [isLoading, setisLoading] = useState(false);
const [loadUser, setloadUser] = useState(false);

const ENDPOINT=process.env.NEXT_PUBLIC_SOCKET_URI
const socketId=socketIO(ENDPOINT,{transports:['websocket']})

let {refetch}=useLoadUserQuery({},{refetchOnMountOrArgChange:true})

let [createOrder,{data:orderData,error}]=useCreateOrderMutation();



const handleSubmit=async(e)=>{
  e.preventDefault();
  setisLoading(true);
  
  if(!stripe ||!elements){return ;}

  const {error,paymentIntent}=await stripe.confirmPayment({
    elements,
    redirect:"if_required"
  });
  if(error){
    setisLoading(false);
    setMessage(error.message);
  }else if(paymentIntent && paymentIntent.status==='succeeded'){
    setisLoading(false);
    
    await createOrder({
      courseId:data._id,
      payment_info:paymentIntent
    })
  }
}
useEffect(()=>{
  if(orderData){
    setOpen(false);
    refetch();

    socketId.emit('notification',{
      title:"New Order",
      message:`you have a new order from ${data?.name}`,
      userId:user._id
    })
    redirect(`/course-access/${data._id}`);
  }
  if(error){
    toast.success(error.message);
  }
  },[orderData,error])

  return (
    <form onSubmit={handleSubmit} id='payment-form'>
    <LinkAuthenticationElement id='link-authentication-element'   />
            <PaymentElement id='payment-element' /> 
    <button disabled={!stripe || !elements || isLoading  }>
        <span dir='button-text' className={`${styles.button} mt-2 !h-[35px] text-white`}>
            {isLoading ?"Paying...":"Pay now"}
        </span>
    </button>
    {message && (
        <div id='payment-message' className=" text-[red] font-Poppins pt-2">
            {message}
        </div>
    )}

</form>
  )
}

export default CheckOutForm