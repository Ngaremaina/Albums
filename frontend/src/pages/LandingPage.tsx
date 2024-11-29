import { Link } from "react-router-dom"

function LandingPage() {
    return(
        <div className="landing">
            <div className="bg-gray-100">
                
            <section className="bg-blue-teal-gradient relative bg-blue-600 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden flex
            items-center h-screen">
                
                <div className="w-full h-full absolute top-0 left-0 z-0">
                <img src="https://cdn.pixabay.com/photo/2022/10/03/12/03/microphone-7495739_640.jpg" alt = "home" className="w-full cover opacity-20" />
                </div>
                <div className="lg:w-3/4 xl:w-3/4 relative z-5 lg:mt-4">
                <h1 className="text-white text-5xl md:text-5xl xl:text-8xl font-bold">Momentos</h1>
                <div>
                    

                    {/* <p className="text-blue-100 text-xl md:text-normal leading-snug mt-4">Welcome to the Albums Page! This platform offers a centralized space for users to showcase and explore albums.</p> */}
                    <p className="text-blue-100 text-xl md:text-normal leading-snug mt-4">The Albums Page is a user-friendly platform designed to provide seamless access to a collection of albums. With an intuitive interface, users can create personal accounts, securely log in, and explore albums created by others. This page fosters a community-driven environment where users can share their musical or visual creativity.</p>
                    

                   
                    <Link to="/sign in" className="px-8 py-4 bg-teal-500 text-white rounded inline-block mt-8 font-semibold">Sign In</Link>
                    <Link to="/sign up" className="px-8 py-4 bg-teal-500 text-white rounded inline-block mt-8 font-semibold m-3">Sign Up</Link>
                    
                </div>
                </div>
            </section>
            </div>

            </div>

    )
}

export default LandingPage;