import "./App.css";
import SignIn from "../pages/SignIn/SignIn";
import { UserProvider } from "../Contexts/User";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NavBar from "../pages/Navigation/NavBar";

function App() {
  return (
    <UserProvider>
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/profile' element={<SignIn/>}/>
        </Routes>
      </>
    </UserProvider>
  );
}

export default App;
