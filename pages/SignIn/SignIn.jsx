import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { auth, provider } from "../../firebase.config";
import { addUser } from "../../functions";
import logo from '../../src/assets/Git-Connected-1.png'
import { useContext } from "react";
import { UserContext } from "../../Contexts/User";
import { getUserById } from "../../functions";

const SignIn = () => {
  const { setUser } = useContext(UserContext)
  const handleLogIn = async () => {
    const result = await signInWithPopup(auth, provider);
    const userInfo = getAdditionalUserInfo(result);
    const { profile } = userInfo;
    if (userInfo.isNewUser) {
      await addUser(
        profile.login,
        profile.avatar_url,
        profile.html_url,
        profile.name,
        profile.location,
        profile.bio,
        profile.email,
        result.user.uid
      );
    }
    const user = await getUserById(result.user.uid)
    setUser(user)
  };
  return (
    <div className="pageContainer">
      <img src={logo} className="signInImage"/>
      <h1 id="loginHeader">Sign in to Get-Connected</h1>
      < div className="signInBox">
        <p>Login or signup with Github </p>
        <button onClick={handleLogIn} className="signInButton">Github</button>
      </div>
      <div className="signInBox">
        <p>Don't have an account?</p>
        <button className="signInButton">Guest</button>
      </div>
    </div>
  );
};

export default SignIn;
