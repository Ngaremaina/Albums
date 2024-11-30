import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginResponse } from "../models/responses/UserResponse";
import { loginUser } from "../services/Users";
import { AuthProviderProps, AuthContext } from "../hooks/authContext";
import { getData } from "../hooks/idHelpers";
import { logoutUser } from "../services/Users";

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<LoginResponse | null>(null);
    
    const handleLogin = async (emailAddress: string, password: string) => { 
      setIsLoading(true);
      try {
          const userdata = await loginUser(emailAddress, password, navigate);

          if (userdata) {
            setUserData(userdata);
            setUserToken(userdata.token);
        } else {
            setUserToken(null);
        }
          

  
      } catch (error) {
          console.error('Login error:', error);
      } finally {
          setIsLoading(false);
      }
  };
  
  
  const handleLogout = () => {
    try {
        setUserToken(null);
        setUserData(null);
        logoutUser();
        navigate('/');
        setIsLoading(false);
    } catch (error) {
        console.error('Logout error:', error);
    }
};
    
    const isLoggedIn = async () => {
      try {
          setIsLoading(true);
          const usertoken = await getData('userToken');
          const userinfo = await getData('userInfo');
  
          if (userinfo) {
              setUserToken(usertoken as string);
              setUserData(userinfo as LoginResponse);
  
              if (window.location.pathname !== "/dashboard") {
                  navigate("/dashboard");
              }
          }
          setIsLoading(false);
      } catch (error) {
          console.error('isLoggedIn error:', error);
      }
  };
  
    useEffect(() => {
      isLoggedIn();
    }, []);
  
    return (
      <AuthContext.Provider value={{ isLoading, handleLogin, handleLogout, userToken, userData }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  
  export { AuthContext, AuthProvider };
  