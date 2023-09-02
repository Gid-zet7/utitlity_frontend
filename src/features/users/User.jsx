// import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { selectUsersById } from "./usersApiSlice";
import { Link } from "react-router-dom";
// import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const User = ({ userId }) => {
    const user = useSelector(state => selectUsersById(state, userId))

    // const navigate = useNavigate()

    // useEffect(() => {
    //     console.log(`user--${user.num_of_persons}`)
    // })
    
    if (user) {
        // const handleEdit = () => navigate(`/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        // const cellStatus = user.active ? "" : "table__cell--inactive"

        return (
            <>
            <tr>
                <td className={`table__cell`}> <Link to={`/home/users/${user.id}`}>{user.username} </Link></td>
                <td className={`table__cell`}>{userRolesString}</td>
            </tr>
            {/* <button onClick={handleEdit}></button> */}
            
            </>
            

            
            
        )
    } else return null
}

export default User