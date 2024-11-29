import { useContext, useState } from "react";
import FormTemplate from "../components/forms/FormTemplate";
import InputField from "../components/forms/InputTemplate";
import { useParams } from "react-router-dom";
import { updateImage } from "../services/Images";
import { AuthContext } from "../hooks/authContext";
import { ImageRequest } from "../models/requests/ImageRequest";
import { useNavigate } from "react-router-dom";


function EditImage(){

    const {id} = useParams()
    const {userToken} = useContext(AuthContext)
    const navigate = useNavigate()
       

    const [image, setImage] = useState<ImageRequest>({
        imageTitle: "",
        
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage({...image, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // update image
        // console.log(image)
        updateImage(id, userToken, image, navigate)
    }

    return(
        <FormTemplate handleSubmit={handleSubmit} heading="Edit Image">

            <InputField
                type="text"
                id="imageTitle"
                name="imageTitle"
                placeholder="Image Title"
                value={image.imageTitle}
                onChange={handleChange}
                label="Image Title"/>

        </FormTemplate>
    )

}

export default EditImage;