import {
    signInWithPopup,
    getAdditionalUserInfo
} from "firebase/auth";
import { auth, provider } from "./firebase.config";
import { addUser } from "./functions";

const SignIn = () => {
    const handleLogIn = async () => {
      const result = await signInWithPopup(auth, provider);
      const userInfo = getAdditionalUserInfo(result);
    //   setUser(userInfo);
      const { profile } = userInfo;
      if (userInfo.isNewUser) {
        addUser(
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
    };
    return (
        <>
            <button onClick={handleLogIn}>SignIn</button>
        </>
    )
}

export default SignIn