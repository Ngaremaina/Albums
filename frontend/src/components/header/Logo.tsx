import { Link } from "react-router-dom"

export default function Logo(){
    return(
          <Link className="flex items-center space-x-3 rtl:space-x-reverse" to="/dashboard">
             <img
              src="https://cdn.pixabay.com/photo/2014/04/02/10/16/fire-303309_640.png"
              className="h-8"
              alt="Albums Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap opacity-100">
              Momentos
            </span>

          </Link>
    )
}