/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewBillMutation } from "./billsApiSlice"


const NewBillForm = ({ users }) => {

    const [addNewBill, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewBillMutation()

    const navigate = useNavigate()

    const [userId, setUserId] = useState(users[0].id)
    const [totalBill, setTotalBill] = useState(0)
    const [bill, setBill] = useState(0)
    const [numOfPersons, setNumOfPersons] = useState(0)
    const [totalNumOfPersons, setTotalNumOfPersons] = useState(31)
    const [balance, setBalance] = useState(0)
    const [status, setStatus] = useState("")

    useEffect(() => {
        if (isSuccess) {
            setUserId('')
            setBill('')
            setNumOfPersons("")
            setTotalNumOfPersons("")
            setBalance("")
            setStatus('')
            setTotalBill(0)
            navigate('/home/bills')
        }
    }, [isSuccess, navigate])

    const onUserIdChanged = e => setUserId(e.target.value)
    const onTotalBillChanged = e => setTotalBill(e.target.value)
    const onBillChanged = e => setBill(e.target.value)
    const onNumOfPersonsChanged = e => setNumOfPersons(e.target.value)
    const onTotalNumOfPersonsChanged = e => setTotalNumOfPersons(e.target.value)
    const onBalanceChanged = e => setBalance(e.target.value)
    const onStatusChanged = e => setStatus(e.target.value)

    const canSave = [userId, totalBill].every(Boolean) && !isLoading

    const onSaveBillClicked = async (e) => {
        e.preventDefault()
        const roundedBill = Math.round((totalBill / totalNumOfPersons) * numOfPersons)
        const paidStatus = balance === 0 ? "Paid" : "Not paid"
        if (canSave) {
            await addNewBill({ total_bill: totalBill,  bill: roundedBill  , user: userId, num_persons: numOfPersons, total_pple: totalNumOfPersons, balance: roundedBill, status : paidStatus  })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validBillClass = !bill ? "form__input--incomplete" : ''
    // const validBalanceClass = !balance ? "form__input--incomplete" : ''

    const content = (
        <>

        <section id="new_edit_forms">
            <h2>New Bill</h2>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveBillClicked}>

                <label className="form__label" htmlFor="total_bill">
                    Total Bill:</label>
                <input
                    className={"form__input form__input--text"}
                    id="total_bill"
                    name="total_bill"
                    type="number"
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
                    value={bill}
                    onChange={onBillChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="user">
                    ASSIGNED TO:</label>
                <select
                    id="user"
                    name="user"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>

                <label htmlFor="num_persons">
                    Number of persons: 
                </label>
                    <input className={`form__input`} id="num_of_persons" 
                    name="num_persons" 
                    type="number" 
                    value={numOfPersons} 
                    onChange={onNumOfPersonsChanged}/>
    
                <label htmlFor="total_pple">
                    Total number of people: 
                </label>
                    <input className={`form__input`} id="total_num_of_pple" 
                    name="total_pple" 
                    type="number" 
                    value={totalNumOfPersons} 
                    onChange={onTotalNumOfPersonsChanged}/>
    
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
                        disabled={!canSave}
                    >
                        Save
                    </button>
                </div>
                


            </form>
        </section>

        </>
    )

    return content
}

export default NewBillForm