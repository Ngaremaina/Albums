import { UserDetailsResponse } from "../../models/responses/UserResponse";
import { Link } from "react-router-dom";
function UserCard({userResponse, albumResponseList}: UserDetailsResponse){
    const initial: string = userResponse.name[0]

    const albumLength = albumResponseList.length;

    return(
        <Link to={`/${userResponse.username}`} className="w-full max-w-sm pt-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 hover:scale-105">
        
            <div className="flex flex-col items-center pb-10">
        
                <div className="w-24 h-24 flex justify-center items-center rounded-full bg-blue-500">
                    <p className="text-3xl font-semibold text-center">{initial}</p>
                </div>
          
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userResponse.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{userResponse.username}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{userResponse.emailAddress}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{albumLength} Albums</span>
                <div className="flex mt-4 md:mt-6">
            </div>
            </div>
        </Link>
    )
}


export default UserCard;