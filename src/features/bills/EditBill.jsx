import { useParams } from "react-router-dom"
import { useGetBillsQuery } from "./billsApiSlice"
import { useGetUsersQuery } from "../users/usersApiSlice"
import { PulseLoader } from "react-spinners"
import UseAuth from "../../hooks/useAuth"
import EditBillForm from './EditBillForm'


const EditBill = () => {
    const { id } = useParams()

  const { username, roles } = UseAuth()

  const isAdmin = roles.includes("Admin")

    const { bill } = useGetBillsQuery("billsList", {
        selectFromResult: ({ data }) => ({
            bill: data?.entities[id]
        })
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    if (!bill || !users?.length) return <PulseLoader color={"#BADA55"} />

    if (!isAdmin) {
        if (bill.username !== username) {
            return <p>No access</p>
        }
    }

    const content = bill && users ? <EditBillForm bill={bill} users={users} /> : <PulseLoader color={"#BADA55"} />

    return content
}

export default EditBill