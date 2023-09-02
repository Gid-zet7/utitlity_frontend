import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import usePersist from "../../hooks/usePersist";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { PulseLoader } from "react-spinners";


const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    },[])

    useEffect(() => {
        setErrMsg("")
    },[username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({username, password}).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername("")
            setPassword("")
            navigate("/home/welcome")
        } catch (err) {
            if (!err.status) {
                setErrMsg("No server Response")
            } else if (err.status === 400) {
                setErrMsg("Missing Username or Password")
            } else if (err.status === 401) {
                setErrMsg("Unauthorized")
            } else {
                setErrMsg(err.data?.message)
            }
            errRef.current.focus()
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errMsg" : "offscreen"

    if (isLoading) return <PulseLoader color={"#BADA55"} />

    const content = (
        <section id="auth_section">
            <div id="auth_header">
                <h1>Login</h1>
            </div>
            <div>
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                <form id="auth_form" onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username:
                    </label>
                    <input
                        type="text" 
                        ref={userRef} 
                        value={username} 
                        onChange={handleUserInput} autoComplete="off" 
                        required />

                    <label htmlFor="password">
                        Password:
                    </label>
                    <input
                        type="password" 
                        value={password} 
                        onChange={handlePwdInput} 
                        required />
                    <button>Sign In</button>

                    <label htmlFor="persist">
                        <input
                        type="checkbox" 
                        checked={persist} 
                        onChange={handleToggle} 
                        /> 
                        Trust this Device

                    </label>
                    
                </form>
                <div>
                    <Link to="/">Back to Home</Link>
                </div>
            </div>

        </section>
    )

    return content
}

export default Login
