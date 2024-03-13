import { useContext, useState } from "react"
import { UserContext } from "../../Contexts/User"
import UserInfo from "./components/userInfo"
import EditProfile from "../EditProfile/EditProfile"

function Profile() {
    const { user } = useContext(UserContext)
    return (
        <>
            <UserInfo userData={user} />
            <h1>Welcome to my profile</h1>
        </>
    )
}
export default Profile