import { Route, Routes } from "react-router-dom";
import LoginUser from "../pages/shared/LoginUser";
import { useContext } from "react";
import { AuthContext } from "../helpers/authContext";
import ProgressSpinner from "../components/loader/ProgressSpinner";
import Dashboard from "../pages/Dashboard";
import RegisterUser from "../pages/shared/RegisterUser";


function AppRoutes(){
    const { isLoading, userToken } = useContext(AuthContext);

    // console.log(userData.role)
    // console.log(userToken)

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