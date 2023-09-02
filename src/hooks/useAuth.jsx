import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const UseAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    // let isManager = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        // console.log(decoded)
        const {username, roles} = decoded.UserInfo

        // isManager = roles.includes("Manager")
        isAdmin = roles.includes("Admin")

        if(isAdmin) status = "Admin"

        return {username, status, roles}
    }

    return {username: "", roles:[], status}
}

export default UseAuth