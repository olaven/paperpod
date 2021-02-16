import { Footer } from "./footer";
import { Header } from "./header/header"

export const Layout = (props) => {

    return <>
        <Header />
        {props.children}
        <Footer />
    </>
};