import { useSelector } from "react-redux";
export const userAuth=()=>{

    const {user}=useSelector((state)=>state.auth);
    console.log(user);
    if(user){
        return true;
    }
    else{
        return false;
    }

}