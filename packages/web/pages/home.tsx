import { useContext } from "react"
import { UserContext } from "../components/authentication/UserContext"


const Home = () => {

    const { user } = useContext(UserContext);
    return <>You are logged in as {user.email}</>
}

export default Home;