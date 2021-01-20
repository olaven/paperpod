import { useContext } from "react"
import { UserContext } from "../authentication/UserContext"

export const Feed = () => {


    const { user } = useContext(UserContext);

    return <>
        <br />
        <button onClick={async () => {
            const response = await fetch(`/api/feeds/${user._id}`);
            console.log(response.status)
            console.log(await response.text())
        }}>
            getFeed
      </button>

        Din feed: <a>
            https://paperpod.fm/api/feeds/{user._id}
        </a>
    </>
}