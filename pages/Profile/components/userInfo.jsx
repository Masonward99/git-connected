import { useContext, useState} from "react"
import { UserContext } from "../../../Contexts/User"
import { Link } from "react-router-dom"
import EditProfile from "../../EditProfile/EditProfile"

function UserInfo({ userData }) {
    const { user } = useContext(UserContext)
    const [isEditOpen, setIsEditOpen] = useState(false);
    return (
      <div id="profileInfoBox">
        <img src={userData.avatar_url} />
        <div id="profileInfo">
          <h1>{userData.username}</h1>
          <h2>{userData.name}</h2>
          <h2>{userData.location}</h2>
          <h3>{userData.email}</h3>
          {/* temporary will be moved to own section */}
          <h3>{userData.bio}</h3>
          <div className="buttonBox">
            <a href={userData.html_url} target="blank" className="githubButton">
              Github
            </a>
            <a href={userData.html_url} target="blank" className="githubButton">
              Github
            </a>
          </div>
        </div>
        {/* <Link to='/' className="editButton">Edit</Link> */}
        <button
          onClick={() => {
            setIsEditOpen(true);
          }}
          className="editButton"
        >Edit</button>
        <EditProfile
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          user={user}
        />
      </div>
    );
}
export default UserInfo