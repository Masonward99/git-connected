import { useContext, useState } from "react"
import { UserContext } from "../../Contexts/User"
import UserInfo from "./components/userInfo"
import EditProfile from "../EditProfile/EditProfile"
import { getRepoList } from "../../functions"
import { useEffect } from "react"
import RepoSelection from "../AddPortfolio/Components/RepoSelection"
import AddPortfolio from "../AddPortfolio/AddPortfolio"

function Profile() {
    const { user } = useContext(UserContext)
    const [repoList, setRepoList] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        getRepoList(user.username)
       .then((repos)=>setRepoList(repos)) 
    }, [])
    console.log(repoList)
    return (
        <>
            <button onClick={()=>{setIsOpen(true)}}>Open</button>
            <UserInfo userData={user} />
            <AddPortfolio isOpen={isOpen} setIsOpen={setIsOpen} repoList={repoList} />
            <h1>Welcome to my profile</h1>
        </>
    )
}
export default Profile