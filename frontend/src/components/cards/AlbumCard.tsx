import { Link } from "react-router-dom";
import { AlbumResponse } from "../../models/responses/AlbumResponse";

function AlbumCard({ id, albumTitle }: AlbumResponse) {
    
    return (    
        <Link to={`/albums/${id}`}>
        
            <div className="bg-white shadow-md rounded-lg p-6 mb-8 h-36" >
            <h1 className="text-xl text-gray-900">{albumTitle}</h1>
            </div>
        </Link>    

 
    );
}

export default AlbumCard;

