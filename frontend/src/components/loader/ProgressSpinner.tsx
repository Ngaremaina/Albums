import { ThreeCircles } from "react-loader-spinner";

function ProgressSpinner(){
    return(
        <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass="flex justify-center h-screen items-center"
        />
    )

}

export default ProgressSpinner;