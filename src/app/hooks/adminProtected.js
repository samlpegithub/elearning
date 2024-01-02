import { useSelector } from "react-redux";

import { redirect } from "next/navigation";

export const AdminProtected = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    if (user) {
        const isAdmin = user.role === 'admin';
        return isAdmin ? children : redirect("/")

    }
}