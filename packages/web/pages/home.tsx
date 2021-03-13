import { useContext } from "react"
import { UserContext } from "../components/authentication/UserContext"


const Home = () => {

    const { user } = useContext(UserContext);
    return user? 
        <div>you are logged in as {user.email}</div>: 
        <div>loading.</div>
}

export default Home;