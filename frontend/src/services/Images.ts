import axiosInstance from "../api/api"
import { ImageRequest } from "../models/requests/ImageRequest"

export const getImage = async (id: string | undefined, token: string | null) => {

    const url = axiosInstance.getUri() + `/api/v1/images/${id}`

    try{
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }
    catch(error){
        console.error('Error:', error);
    }

}

export const updateImage = async (id: string | undefined, token: string | null, image: ImageRequest) => {

    const url = axiosInstance.getUri() + `/api/v1/images/${id}`
    // console.log(image)

    try{
        const response = await fetch(url, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(image)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }
    catch(error){
        console.error('Error:', error);
    }

}