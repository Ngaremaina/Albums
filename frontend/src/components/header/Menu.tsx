import { Link } from "react-router-dom";
import { MenuProps } from "../../helpers/ComponentProps";

export default function Menu({isNavOpen}: MenuProps){
    return(
        <div className={`items-center justify-between ${isNavOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4  rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li>
              <Link to="/dashboard" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
            </li>
                        
            <li>
              <Link to="/about us" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">About Us</Link>
            </li>
            
          </ul>
        </div>
        
    )
}