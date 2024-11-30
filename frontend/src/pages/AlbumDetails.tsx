import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../hooks/authContext";
import { getAlbumDetails } from "../services/Albums";
import { AlbumDetailsResponse } from "../models/responses/AlbumResponse";
import ImageCard from "../components/cards/ImageCard";
import MoonLoaderSpinner from "../components/loader/MoonLoader";
import Layout from "../layout/Layout";

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
    
    console.log(album)

    const displayImages = album?.imageResponseList.map(image => {
        return <ImageCard key = {image.id} id = {image.id} imageTitle={image.imageTitle} imageUrl={image.imageUrl}/>
    })

    return  (
        <Layout>
            {loading ? (
                <MoonLoaderSpinner />
            ) : (
                <div className="px-10">
                    <h1 className="text-xl uppercase font-bold text-gray-900">Album details</h1>
                    <hr/>
                    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                        <h1 className="text-sm font-bold text-gray-900">{album?.albumTitle}</h1>
                    </div>
                    <h1 className="text-xl uppercase font-bold text-gray-900">Album Images</h1>
                    <hr/>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayImages}
                    
                    </div>

                </div>
            )}
        </Layout>
        
    )
}

export default AlbumDetails;

