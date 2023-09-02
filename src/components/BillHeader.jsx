import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import UseAuth from "../hooks/useAuth";
import { PulseLoader } from "react-spinners";


const HOME_REGEX = /^home(\/)?$/
const BILLS_REGEX = /^home\/bills(\/)?$/
const USERS_REGEX = /^home\/users(\/)?$/

const BillHeader = () => {

    const { roles, username } = UseAuth()

    const isAdmin = roles.includes("Admin")

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, {
    isLoading,
    isSuccess,
    // isError,
    // error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  },[isSuccess, navigate])

  const onNewBillClicked = () => navigate("/home/bills/new")
  const onNewUserClicked = () => navigate("/home/users/new")
  const onBillsClicked = () => navigate("/home/bills")
  const onUsersClicked = () => navigate("/home/users")

  const onLogoutClicked = () => sendLogout()


  let dashClass = null
  if (!HOME_REGEX.test(pathname) && !BILLS_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
    dashClass = "home-header__container--small"
  }

  const homeButton = (
    <button id="home_btn"><Link to="/home/welcome">Home</Link></button>
    
  )

  let newBillButton = null
  if (isAdmin) {
    if (!BILLS_REGEX.test(pathname)) {
      newBillButton = (
        <button title="new Bill" onClick={onNewBillClicked}>
          New Bill
        </button>
      )
    }
  }

  let newUserButton = null
  if (isAdmin) {
    if (!USERS_REGEX.test(pathname)) {
      newUserButton = (
        <button title="New User" onClick={onNewUserClicked}>
          New User
        </button>
      )
    }
  }

  let userButton = null
  if (isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/home")) {
      userButton = (
        <button title="Users" onClick={onUsersClicked}>
          Users
        </button>
      )
    }
  }
  

  let billsButton = null
  if (!BILLS_REGEX.test(pathname) && pathname.includes("/home")) {
    billsButton = (
      <button title="Bills" onClick={onBillsClicked}>
        Bills
      </button>
    )
  }

  const logoutButton = (
    <button className="logout" title="Logout" onClick={onLogoutClicked}>
      Logout
    </button>
  )

  // const errClass = isError ? "errmsg" : "offscreen"

  let buttonContent
  if (isLoading) {
    buttonContent =  <PulseLoader color={"#BADA55"} />
  } else {
    buttonContent = (
      <>
        {homeButton}
        {newBillButton}
        {newUserButton}
        {billsButton}
        {userButton}
 
      
      </>
    )
  }

  const content = ( 
    <>
      {/* <p className={errClass}>{error?.data?.message} </p> */}

      <header className="home_header">
        <div className="container-header_title">
          <Link to="/home">
            <h1 className="home-header_title">Water Bill</h1>
          </Link>
          <div id="opt">
            {username}
            {logoutButton}
          </div>
        </div>
        <div className={`home-header_container ${dashClass}`}>
          
          <nav className="nav">
            {buttonContent}
          </nav>
        </div>
      </header>

    </>
  )

  return content
       
    
}

export default BillHeader