import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../hooks/authContext";
import { getAlbumDetails } from "../services/Albums";
import { AlbumDetailsResponse } from "../models/responses/AlbumResponse";
import ImageCard from "../components/cards/ImageCard";
import MoonLoaderSpinner from "../components/loader/MoonLoader";

function AlbumDetails() {

    const { id } = useParams()
    const {userToken} = useContext(AuthContext)
    const [album, setAlbum] = useState<AlbumDetailsResponse>()
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAlbumDetails = async () => {
            setLoading(true); // Start loading
            try{
                const response = await getAlbumDetails(id, userToken)
                setAlbum(response)
            }
            catch(error){
                console.error("Error fetching album details:", error)
            } finally {
                setLoading(false); // Stop loading
            }
            
        }

        fetchAlbumDetails()
    },[userToken, id])
    
    // console.log(album)

    const displayImages = album?.imageResponseList.map(image => {
        return <ImageCard key = {image.id} id = {image.id} imageTitle={image.imageTitle} imageUrl={image.imageUrl}/>
    })

    return  (
        <>
            {loading ? (
                <MoonLoaderSpinner />
            ) : (
                <div>
                    <h2>Album Details</h2>
                    <p>{album?.albumTitle}</p>
                    <h2 className="uppercase font-bold mt-3">Images</h2>
                    <hr />
                    <div className="sm:px-2 md:grid grid-cols-3 gap-x-2 gap-y-2 lg:grid-cols-4">
                        {displayImages}
                    </div>
                </div>
            )}
        </>
        
    )
}

export default AlbumDetails;

