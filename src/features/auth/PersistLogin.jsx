import { Outlet, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { PulseLoader } from "react-spinners";


const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {

        // eslint-disable-next-line no-undef
        if (effectRan.current === true || process.env.NODE_ENV !== "development") {

            const verifyRefreshToken = async () => {
                console.log("verifying refresh token")
                try {
                    // const response = 
                    await refresh()
                    // const { accessToken } = response.data
                    setTrueSuccess(true)

                } catch (err) {
                    console.log(err)
                }
            
            }

            if (!token && persist) verifyRefreshToken()
            
        }
        return () => effectRan.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let content

    if (!persist) { // psersist: no
        console.log("no persist")
        content = <Outlet />
    } else if (isLoading) { // persist: yes, token: no
        console.log("loading")
        content = <PulseLoader color={"#BADA55"} />
    } else if (isError) { // persist: yes, token: no
        console.log("error")
        content = (
            <p>{`${error?.data?.message} - `} <Link to="/login">Please login again</Link> </p>
        )
    } else if (isSuccess && trueSuccess) { // persist: yes, token: yes
        console.log("success")
        content = <Outlet />
    } else if (token && isUninitialized) {// persist: yes, token: yes
        console.log("token and uninit")
        // console.log(isUninitialized)
        content = <Outlet />
    }
    
    
    

    return content
}

export default PersistLogin