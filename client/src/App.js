import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { isMobile } from 'react-device-detect'
import NoResponsive from "./pages/noResponsive/NoResponsive";

function App() {
  const { user } = useContext(AuthContext)
  
  if(isMobile) {
    return (
      <NoResponsive />
    )
  } else {
    return(
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/profile/:username" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login /> } />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register /> } />
        </Routes>
      </BrowserRouter>
    );
  }

}

export default App;
