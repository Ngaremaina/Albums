import { ImageResponse } from "../../models/responses/ImageResponse";

function ImageCard({imageTitle, imageUrl}: ImageResponse){
    return(
        
        <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
            <img className="rounded-lg" src={imageUrl} alt={imageTitle} />
            
            <figcaption className="absolute px-4 text-lg text-white bottom-6">
                <p>{imageTitle}</p>
            </figcaption>
        </figure>
    )
    
}

export default ImageCard;