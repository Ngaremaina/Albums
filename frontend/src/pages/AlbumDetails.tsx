import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../hooks/authContext";
import { getAlbumDetails } from "../services/Albums";
import { AlbumDetailsResponse } from "../models/responses/AlbumResponse";
import ImageCard from "../components/cards/ImageCard";

function AlbumDetails() {

    const { id } = useParams()
    // console.log(id)
    const {userToken} = useContext(AuthContext)
    const [album, setAlbum] = useState<AlbumDetailsResponse>()


    useEffect(() => {
        const fetchAlbumDetails = async () => {
            const response = await getAlbumDetails(id, userToken)
            setAlbum(response)
        }

        fetchAlbumDetails()
    },[userToken, id])
    
    // console.log(album)

    const displayImages = album?.imageResponseList.map(image => {
        return <ImageCard key = {image.id} id = {image.id} imageTitle={image.imageTitle} imageUrl={image.imageUrl}/>
    })

    return  (
        <div>
            <h2>Album Details</h2>
            <p>{album?.albumTitle}</p>
            <h2 className="uppercase font-bold mt-3">Images</h2>
            <hr/>
            <div className="sm: px-2 md:grid grid-cols-3 gap-x-2 gap-y-2 lg:grid-cols-4">
                {displayImages}
            </div>
        </div>
    )
}

export default AlbumDetails;

