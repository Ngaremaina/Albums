import axiosInstance from "../api/api"

export const getAlbumDetails = async (id: string | undefined, token: string | null) => {

    const url = axiosInstance.getUri() + `/api/v1/albums/${id}`

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