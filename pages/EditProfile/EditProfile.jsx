import Modal from "react-modal"
import { useState } from "react"
import { editProfile, getUserById } from "../../functions"
import { useContext } from "react"
import { UserContext } from "../../Contexts/User"

function EditProfile({isOpen, setIsOpen, }) {
    const {user, setUser} = useContext(UserContext)
    const [Name, setName] = useState(user.name)
    const [location, setLocation] = useState(user.location)
    const [email, setEmail] = useState(user.email)
    const [bio, setBio] = useState(user.bio)
    Modal.setAppElement("#app");
    async function handleSubmit(e) {
        e.preventDefault()
        await editProfile(user.username, bio, email, location, Name)
        const updatedUser = await getUserById(user.id)
        setUser(updatedUser)
        setIsOpen(false)
    }

    function onOpen() {
        setEmail(user.email)
        setLocation(user.location)
        setBio(user.Bio)
        setName(user.name)
    }
    

    return (
        <Modal isOpen={isOpen} className='EditModal' onAfterOpen={onOpen} >
            <button onClick={()=>setIsOpen(false)}>Close Modal</button>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <label>
                    Username:
                    <input readOnly='true' type="text" value={user.username} tabIndex='0' name="username"/>
                </label>
                <label>
                    Name:
                    <input type="text" placeholder="Name..." value={Name} onChange={(e)=>setName(e.target.value)} tabIndex='1' name="Name"/>
                </label>
                <label>
                    Location:
                    <input type="text" placeholder="Location..." value={location} onChange={(e)=>setLocation(e.target.value)} tabIndex='2' name="location"/>
                </label>
                <label>
                    Email:
                    <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} tabIndex='3' name='email'/>
                </label>
                <label>
                    Bio:
                    <textarea  placeholder="Bio..." value={bio} onChange={(e) => setBio(e.target.value)} name="bio" tabIndex='4'/>
                </label>
                <button type="submit">Save</button>
            </form>
        </Modal>
    )
    
}
export default EditProfile