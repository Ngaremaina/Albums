import { TailSpin } from "react-loader-spinner";

function MoonLoaderSpinner(){
    return(

        <TailSpin
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="three-circles-loading"
            wrapperClass="flex justify-center h-screen items-center"/>

    )
}

export default MoonLoaderSpinner;