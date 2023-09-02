import { useSelector } from "react-redux";
import { selectUsersById } from "./usersApiSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";

const UserPage = () => {
  
    let { id }  = useParams()

    const user = useSelector(state => selectUsersById(state, id))

    const [totalBill, setTotalBill] = useState(0)
    const [numOfTenants, setNumOfTenants] = useState(31)

    const onBillChanged = e => setTotalBill(e.target.value)
    const onNumOfTenantsChanged = e => setNumOfTenants(e.target.value)

    // useEffect(() => {
    //   console.log(`Userpage--${id} `)
    //   console.log(`Userpage--user---${user} `)
    // })

    const bill = (
      Math.round((totalBill / numOfTenants) * user.num_of_persons) 
    )

    return (
        <section>
          <form>
            <label htmlFor="total_bill">Total Bill:</label>
            <input type="text" name="total_bill" value={totalBill}onChange={onBillChanged}></input>

            <label htmlFor="num_tenants">Number of Tenants:</label>
            <input type="text" name="num_tenants" value={numOfTenants} onChange={onNumOfTenantsChanged}></input>

            <button>Enter</button>
            
          </form>

          <p>Your bill is {bill}</p>
        </section>
        
    )
}

export default UserPage