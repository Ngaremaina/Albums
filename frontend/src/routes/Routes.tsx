import { Route, Routes } from "react-router-dom";
import LoginUser from "../pages/shared/LoginUser";
import { useContext } from "react";
import { AuthContext } from "../hooks/authContext";
import ProgressSpinner from "../components/loader/ProgressSpinner";
import Dashboard from "../pages/Dashboard";
import RegisterUser from "../pages/shared/RegisterUser";
import UserDetails from "../pages/UserDetails";
import AlbumDetails from "../pages/AlbumDetails";
import EditImage from "../pages/EditImage";
import LandingPage from "../pages/LandingPage";
import AboutUs from "../pages/AboutUs";
import Profile from "../pages/Profile";

function AppRoutes(){
    const { isLoading, userToken } = useContext(AuthContext);

    if (isLoading) {
        return (
            <ProgressSpinner/>
        )
    }
    return(
        <>
        {userToken ? (
          <Routes>
            <Route path="/dashboard" element = {<Dashboard />} />
            <Route path="/:username" element = {<UserDetails/>} />
            <Route path="/albums/:id" element = {<AlbumDetails/>} />
            <Route path="/images/:id" element = {<EditImage/>} />
            <Route path="/about us" element = {<AboutUs/>}/>
            <Route path="/profile" element={<Profile />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={<LandingPage/>} />
            <Route path="/sign in" element={<LoginUser />} />
            <Route path="/sign up" element={<RegisterUser />} />
          </Routes>
        )}
      </>
    )
}

export default AppRoutes;