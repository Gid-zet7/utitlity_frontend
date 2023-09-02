import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import UsersList from "./features/users/UsersList"
import Public from "./components/Public"
import Login from "./features/auth/Login"
import BillLayout from "./components/BillLayout"
import Welcome from "./features/auth/Welcome"
import BillsList from "./features/bills/BillsList"
import NewUserForm from "./features/users/NewUserForm"
import EditUser from "./features/users/EditUser"
import EditBill from "./features/bills/EditBill"
import PersistLogin from "./features/auth/PersistLogin"
import Prefetch from "./features/auth/Prefetch"
import useTitle from "./hooks/useTitle"
// import NewBillForm from "./features/bills/NewBillForm"
import Checkout from "./features/payment/Checkout"
import NewBill from "./features/bills/NewBill"
import Signup from "./features/auth/Signup"


function App() {
  useTitle("Bill Calculator")

  return (
    <Routes>
      <Route path="/" element={<Layout/>} >
        <Route index element={<Public />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="paycheckout" element={<Checkout />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="home" element={<BillLayout /> }>
              <Route index path="welcome" element={<Welcome />} />

              <Route path="bills">
                <Route index element={<BillsList />}/>
                <Route path=":id" element={<EditBill />} />
                <Route path="new" element={<NewBill />} />
              </Route>

              <Route path="users">
                <Route index element={<UsersList />}/>
                <Route path=":id" element={<EditUser />} />
                <Route path="new" element={<NewUserForm />} />
              </Route>

            </Route>
          </Route>
        </Route>


        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Route>
    </Routes> 
  )
}

export default App
