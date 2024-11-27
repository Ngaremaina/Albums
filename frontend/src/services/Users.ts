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

        const userdata: LoginResponse = await res.json(); 
        // console.log("User data:", userdata);  

        await storeData('userInfo', userdata);
        await storeData('userToken', userdata.token);
        navigate('/dashboard');

        return userdata
        
  } catch (error: unknown) {
    console.error('Login error:', error);
  } 
};

export const logoutUser = async (navigate: (path:string) => void) => {
    await removeData('userInfo');
    await removeData('userToken');
    navigate("/");
  };


export const getAllUsers = async (token: string | null) => {
  const url = axiosInstance.getUri() + "/api/v1/users"

  try{
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return await response.json()

  }

  catch (error: unknown) {
    console.error('Fetching users error:', error);
  }
}
