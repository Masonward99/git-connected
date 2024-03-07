import { useContext } from "react"
import { UserContext } from "../../Contexts/User"

function Home() {
    const { user } = useContext(UserContext)
    console.log(user)
    return (
        <h1>Home</h1>
    )
}

export default Home