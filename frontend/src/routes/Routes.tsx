import { Route, Routes } from "react-router-dom";
import LoginUser from "../pages/shared/LoginUser";
import { useContext } from "react";
import { AuthContext } from "../hooks/authContext";
import ProgressSpinner from "../components/loader/ProgressSpinner";
import Dashboard from "../pages/Dashboard";
import RegisterUser from "../pages/shared/RegisterUser";
import UserDetails from "../pages/UserDetails";

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
          </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={<LoginUser />} />
            <Route path="/register" element={<RegisterUser />} />
          </Routes>
        )}
      </>
    )
}

export default AppRoutes;