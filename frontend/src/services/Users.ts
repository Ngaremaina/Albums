import axiosInstance from "../api/api";
import { storeData, removeData } from "../hooks/idHelpers";
import { RegisterRequest } from "../models/requests/UserRequest";
import { LoginResponse } from "../models/responses/UserResponse";

export const registerUser = async (payload: RegisterRequest, navigate: (path: string) => void) => {
    const url = axiosInstance.getUri() + "/api/v1/users/signup"
    try {
        const response = await fetch(url,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(payload)
        }) 

        if (response.status === 201){
          console.log('Form submitted successfully');
          navigate("/login")

        }
      } catch (error) {
        console.error('Form submission error:', error);
      }
}

export const loginUser = async (email: string, password: string, navigate: (path: string) => void) => {
    const url = axiosInstance.getUri() + "/api/v1/users/login";
    // console.log(url)
    try {
        const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            { 
                emailAddress: email, 
                password: password 
            }),
        });

        if (!res.ok) {
        const errorMessage = `Error: ${res.status} - ${res.statusText}`;
        throw new Error(errorMessage);
        }

        const userdata: LoginResponse = await res.json(); // Parse the response JSON
        // console.log("User data:", userdata);  // Add this for debugging

        // Store user info and token in IndexedDB
        await storeData('userInfo', userdata);
        await storeData('userToken', userdata.token);
        navigate('/dashboard');

        return userdata
        

    // Navigate to appropriate dashboard
  //   navigate(userdata.is_manager ? '/manager-dashboard' : '/dashboard');
  } catch (error: unknown) {
    console.error('Login error:', error);
  } 
};

export const logoutUser = async (navigate: (path:string) => void) => {

    // Remove user info and token from IndexedDB
    await removeData('userInfo');
    await removeData('userToken');
    navigate("/");
  };