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

          setUserData(userdata ?? null);

        //   setUserToken(userdata?.token ?? null);

          if (userData !== null) {
            setUserToken(userData.token);
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
        logoutUser(navigate);
        setIsLoading(false);
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const isLoggedIn = async () => {
      try {
        setIsLoading(true);
        const usertoken = await getData('userToken');
        const userinfo = await getData('userInfo');
    
        // console.log('Retrieved token:', usertoken);
        // console.log('Retrieved user info:', userinfo);
    
        if (userinfo) {
          setUserToken(usertoken as string);
          setUserData(userinfo as LoginResponse);
        }
  
        navigateApp(userinfo as LoginResponse)
  
        
        setIsLoading(false);
      } catch (error) {
        console.error('isLoggedIn error:', error);
      }
    };
  
    const navigateApp = (userData:LoginResponse) => {
      if (userData){
        navigate("/dashboard")
      }
    }
    
  
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
  