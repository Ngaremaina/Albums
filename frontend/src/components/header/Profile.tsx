import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Authentication";
import { ProfileProps } from "../../helpers/ComponentProps";

export default function Profile({isUserMenuOpen, toggleUserMenu}: ProfileProps){

  const { userData, handleLogout } = useContext(AuthContext);
  const initial = userData?.userResponse.name[0];
  
  return(
    <>
      <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded={isUserMenuOpen ? 'true' : 'false'}
          onClick={toggleUserMenu}
        >
          <span className="sr-only">Open user menu</span>
            <div className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-500">
              <p className="text-sm font-semibold text-center">{initial}</p>
            </div>
          
        </button>
        {/* Dropdown menu */}
        {isUserMenuOpen && (
          <div className="fixed top-10 right-1 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">{userData?.userResponse.username}</span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{userData?.userResponse.emailAddress}</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Home</Link>
              </li>
              
              
              <li>
                <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleLogout}>Sign Out</button>
              </li>
            </ul>
          </div>
        )}
    
    </>
  )
}