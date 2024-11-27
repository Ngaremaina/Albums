import { LayoutProps } from "../helpers/ComponentProps";
import Header from "../components/header/Header";

function Layout({children}: LayoutProps){
    return(
        <>
            <Header/>
            {children}
        </>
    )
}

export default Layout;