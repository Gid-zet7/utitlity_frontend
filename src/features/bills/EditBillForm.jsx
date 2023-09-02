/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useUpdateBillMutation, useDeleteBillMutation } from "./billsApiSlice"
import { useNavigate } from "react-router-dom"
import UseAuth from "../../hooks/useAuth"

const EditBillForm = ({ bill, users }) => {

  const { roles } = UseAuth()

  const isAdmin = roles.includes("Admin")

    const [updateBill, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateBillMutation()

    const [deleteBill, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteBillMutation()

    const navigate = useNavigate()

    const [userId, setUserId] = useState(bill.user._id)
    const [username, setUsername] = useState(bill.user.username)
    const [totalBill, setTotalBill] = useState(bill.total_bill)
    const [userBill, setUserBill] = useState(bill.bill)
    const [totalNumOfPple, setTotalNumOfPple] = useState(bill.total_pple)
    const [numOfPersons, setNumOfPersons] = useState(bill.num_persons)
    const [balance, setBalance] = useState(bill.balance)
    const [status, setStatus] = useState(bill.status)

    useEffect(() => {

        // console.log(bill.user)
        
        if (isSuccess || isDelSuccess) {
            setUserId('')
            setUsername('')           
            setTotalBill('')
            setUserBill('')
            setNumOfPersons('')
            setBalance('')
            setStatus('')
            navigate('/home/bills')
        }

    }, [isSuccess, isDelSuccess, navigate])


    const onUsernameChanged = e => setUsername(e.target.value)
    const onBillChanged = e => setUserBill((e.target.value ))
    const onNumOfPersonsChanged = e => setNumOfPersons(e.target.value)
    const onTotalNumOfPpleChanged = e => setTotalNumOfPple(e.target.value)
    const onBalanceChanged = e => setBalance(e.target.value)
    const onStatusChanged = e => setStatus(e.target.value)
    const onTotalBillChanged = e => setTotalBill(e.target.value)


    // const canSave = [userBill, userId, status].every(Boolean) && !isLoading

    const onSaveBillClicked = async (e) => {
        e.preventDefault()
        let paidStatus = bill.balance === 0 ? "Paid" : "Not paid"
        console.log(paidStatus)
        // if (canSave) {
            await updateBill({ total_bill: totalBill,  bill: userBill, num_persons: numOfPersons, total_pple: totalNumOfPple, id: bill.id, user: userId, status: paidStatus, balance  })
        // }
    }

    const onDeleteBillClicked = async () => {
        await deleteBill({ id: bill.id })
    }

    // const created = new Date(post.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    // const updated = new Date(post.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validBillClass = !userBill ? "form__input--incomplete" : ''
    // const validBalanceClass = !balance ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    let deleteButton = null
    if (isAdmin) {
        deleteButton = (
            <button title="Delete" onClick={onDeleteBillClicked} >
                Delete
            </button>
        )
    }

    const content = (
         <>

         <section  id="new_edit_forms">
            <h1>Edit Bill</h1>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveBillClicked}>

                <label className="form__label" htmlFor="total_bill">
                    Total Bill:</label>
                <input
                    className={"form__input form__input--text"}
                    id="total_bill"
                    type="number"
                    name="total_bill"
                    value={totalBill}
                    onChange={onTotalBillChanged}
                />

                <label className="form__label" htmlFor="bill">
                    Bill:</label>
                <input
                    className={`form__input ${validBillClass}`}
                    id="bill"
                    name="bill"
                    type="number"
                    autoComplete="off"
                    value={userBill}
                    onChange={onBillChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="user">
                    ASSIGNED TO:</label>
                <select
                    id="user"
                    name="user"
                    className="form__select"
                    value={username}
                    onChange={onUsernameChanged}
                >
                    {options}
                </select>

            <label htmlFor="num_persons">
                Number of persons: 
            </label>
                <input className={`form__input`} id="num_persons" 
                name="num_persons" 
                type="number" 
                value={numOfPersons} 
                onChange={onNumOfPersonsChanged}/>

            <label htmlFor="total_pple">
                Total Number of people: 
            </label>
                <input className={`form__input`} id="total_pple" 
                name="total_pple" 
                type="number" 
                value={totalNumOfPple} 
                onChange={onTotalNumOfPpleChanged}/>

            <label htmlFor="balance">
                Balance: 
            </label>
                <input className={`form__input`} id="balance" 
                name="balance" 
                type="number" 
                value={balance} 
                onChange={onBalanceChanged}/>

                <label className="form__label" htmlFor="status">
                    Status:</label>
                <textarea
                    className={"form__input form__input--text"}
                    id="status"
                    type="text"
                    name="status"
                    value={status}
                    onChange={onStatusChanged}
                />

                <div className="button_div">
                    <button id="form__action-buttons"
                        className="icon-button"
                        title="Save"
                        // disabled={!canSave}
                    >
                        Save
                    </button>
                </div>

            </form>
         </section>

            <div>
                {deleteButton}
            </div>
        </>
    )

    return content
}

export default EditBillForm