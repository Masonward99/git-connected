import { useContext } from "react"
import { UserContext } from "../../Contexts/User"
import UserInfo from "./components/userInfo"

function Profile() {
    const { user } = useContext(UserContext)
    console.log(user)
    return (
        <>
            <UserInfo userData={user}/>
            <h1>Welcome to my profile</h1>
        </>
    )
}
export default Profile