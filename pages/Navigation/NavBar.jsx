import { Link } from "react-router-dom"
function NavBar() {
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
            <li>
                <Link to='/profile'>
                    <div>Profile</div>
                </Link>
            </li>
        </ul>
    )
}
export default NavBar