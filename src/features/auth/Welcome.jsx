// import { Link } from "react-router-dom"
import UseAuth from "../../hooks/useAuth"
// import { useEffect } from "react"

const Welcome = () => {

  const { username } = UseAuth()
    const date = new Date()
    const today = new Intl.DateTimeFormat("en-Us", {dateStyle: "full", timeStyle: "long"}).format(date)

    // useEffect(() => {
    //   console.log(username, isAdmin)
    // })

    const content = (
        <section className="welcome">
          <p>{today}</p>

          <h1>Welcome {username}, I hope you are having a good time?</h1>

          {/* <p> {isAdmin}</p> */}

          {/* <Link to="bills">View Bills</Link>
          <Link to="bills/new">Add new Bill</Link>
          {(isAdmin) && <Link to="/home/users">View users</Link>}

          <p> {isAdmin}</p> */}


          {/* <p><Link to="/home/posts/new"/>Add new Post</p>
          {(isAdmin) && <p><Link to="/home/users"/> User settings</p>}
          <p><Link to="/home/settings"/>Add New User</p> */}
        </section>
    )
    return content
}

export default Welcome