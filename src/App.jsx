import "./App.css";
import SignIn from "../pages/SignIn/SignIn";
import { UserContext, UserProvider } from "../Contexts/User";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NavBar from "../pages/Navigation/NavBar";
import { useContext } from "react";

function App() {
  return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/profile' element={<SignIn/>}/>
        </Routes>
      </>
  );
}

export default App;
