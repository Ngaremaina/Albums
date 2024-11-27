import { useState } from "react"
import Logo from "./Logo";
import Profile from "./Profile";
import Menu from "./Menu";

export default function Header(){
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleUserMenu = () => {
    if (isNavOpen){
      setIsNavOpen(false)
    }
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleNavMenu = () => {
    if (isUserMenuOpen){
      setIsUserMenuOpen(false)
    }
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo/>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Profile isUserMenuOpen = {isUserMenuOpen} toggleUserMenu={toggleUserMenu}/>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isNavOpen ? 'true' : 'false'}
            onClick={toggleNavMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          
        </div>
          <Menu isNavOpen = {isNavOpen}/> 
      </div>
    </nav>
  );
}