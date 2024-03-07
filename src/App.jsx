import "./App.css";
import SignIn from "../pages/SignIn/SignIn";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NavBar from "../pages/Navigation/NavBar";
import { useContext } from "react";
import { UserContext } from "../Contexts/User";
import Profile from "../pages/Profile/Profile";

function App() {
  const {user} = useContext(UserContext)
  return (
      <div id="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {user ? 
            <Route path='/profile' element={<Profile/>} />:
            <Route path='/profile' element={<SignIn />} />
          }
        </Routes>
      </div>
  );
}

export default App;
