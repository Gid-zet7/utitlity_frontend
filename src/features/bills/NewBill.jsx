import { useGetUsersQuery } from "../users/usersApiSlice"
import { PulseLoader } from "react-spinners"
import NewBillForm from "./NewBillForm"

const NewBill = () => {

    const  { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    if (!users?.length) return <PulseLoader color={"#BADA55"} />

    const content = <NewBillForm users={users}/>

    return content
}

export default NewBill