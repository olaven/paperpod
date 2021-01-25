import { useContext, useState } from "react"
import { asyncEffect } from "../../helpers/asyncEffect";
import { UserContext } from "../authentication/UserContext";
import { fetchFile } from "./playerFetchers";


export const Player = ({ article_id }: { article_id: string }) => {

    const { token } = useContext(UserContext);
    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState(new Audio());

    asyncEffect(async () => {

        if (!playing) {
            audio.pause()
        } else {


            const response = await fetchFile(article_id, token)
            var blob = await response.blob();
            console.log(blob);
            var url = window.URL.createObjectURL(blob);
            const newAudio = new Audio(url);
            setAudio(newAudio);
            newAudio.play();
        }


    }, [playing])


    return <button onClick={() => {
        setPlaying(!playing)
    }}>
        {playing ?
            "Stopp" :
            "Spill"
        }
    </button>

}