import { useContext } from "react"
import { UserContext } from "../../../Contexts/User"
import { Link } from "react-router-dom"

function UserInfo({ userData }) {
    const {user} = useContext(UserContext)
    console.log(user)
    return (
        <div id='profileInfoBox'>
            <img src={userData.avatar_url} />
            <div id='profileInfo'>
                <h1>{userData.username}</h1>
                <h2>{userData.location}</h2>
                <h3>{userData.email}</h3>
                <div className="buttonBox">
                    <a href={userData.html_url} target="blank" className="githubButton">Github</a>
                    <a href={userData.html_url} target="blank" className="githubButton">Github</a>
                </div>
            </div>
            <Link to='/' className="editButton">Edit</Link>
            
        </div>
    )
}
export default UserInfo