import { userAuth } from "./userAuth";

import { redirect } from "next/navigation";

export const Protected=({children})=>{
    const isAuthenticated=userAuth();
    return isAuthenticated ? children : redirect("/")
}