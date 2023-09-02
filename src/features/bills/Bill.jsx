import { useNavigate } from "react-router-dom";
import { useGetBillsQuery } from "./billsApiSlice";
import { memo } from "react";
import UseAuth from "../../hooks/useAuth";

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const Bill = ({ billId }) => {

    const { roles } = UseAuth()
    const isAdmin = roles.includes("Admin")

    const  { bill } = useGetBillsQuery("billsList", {
        selectFromResult: ({ data }) => ({
            bill: data?.entities[billId]
        })
    })

    // useEffect(() => {
    //     console.log(bill)
    // })

    const navigate = useNavigate()

    if (bill) {
        const created = new Date(bill.date).toLocaleString("en-US", {day: "numeric", month: "long", year: "numeric"})


        // const updated = new Date(bill.updatedAt).toLocaleString("en-US", {day: "numeric", month: "long"})

        const stausId = bill.status === "Paid" ? "balance_paid" : "balance_notpaid"

        const handleEdit = () => navigate(`/home/bills/${billId}`)

        let editButton
        if (isAdmin) {
        editButton = <button onClick={handleEdit}> Edit</button>
        
        }

        return (
            <div>
                <p>Username: { bill.user.username} </p>
                <p>Total number of persons: { bill.total_pple} </p>
                <p>Number of persons: { bill.num_persons} </p>
                <p>Total Bill: { bill.total_bill} </p>
                <p>Your bill: { bill.bill} </p>
                <p>Balance: { bill.balance} </p>
                <p>Status: <span id={stausId}>{ bill.status}</span>  </p>
                <p>Date: { created} </p>
                {/* <p>{updated} </p> */}
                {editButton}


                
            </div>
            
        )
    } else return null
}

const memoizedBill = memo(Bill)

export default memoizedBill