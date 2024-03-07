import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../Contexts/User"
function NavBar() {
    const { user } = useContext(UserContext)
    return (
        <ul className="NavBar">
            <li id="navLogo">
                <Link to='/'>
                    <div>Home</div>
                </Link>
                
            </li>
            <li>Users</li>
            <li>Projects</li>
            <li>Messages</li>
            {user ?
                <li>
                    <Link to='/'>
                        <div>{user.username}</div>
                    </Link>
                </li> : 
                <li>
                <Link to='/profile'>
                        <div>Sign in</div>
                    </Link>
                </li>
                }
        </ul>
    )
}
export default NavBar