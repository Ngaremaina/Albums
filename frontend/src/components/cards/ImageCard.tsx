import { ImageResponse } from "../../models/responses/ImageResponse";
import { Link } from "react-router-dom";

function ImageCard({imageTitle, imageUrl, id}: ImageResponse){
    return(
        <Link to = {`/images/${id}`}>
       
        <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
            <img className="rounded-lg" src={imageUrl} alt={imageTitle} />
            
            <figcaption className="absolute px-4 text-lg text-white bottom-6">
                <p>{imageTitle}</p>
            </figcaption>
        </figure>
        </Link>
    )
    
}

export default ImageCard;