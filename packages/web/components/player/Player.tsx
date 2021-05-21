import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { logger } from "@paperpod/common";
import { UserContext } from "../authentication/UserContext";
import { fetchers } from "@paperpod/frontend";

export const Player = ({ article_id }: { article_id: string }) => {
  const { token } = useContext(UserContext);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(new Audio());

  useEffect(() => {
    (async () => {
      if (!playing) {
        audio.pause();
      } else {
        const response = await fetchers.player.fetchFile(article_id, token);
        var blob = await response.blob();
        logger.debug(blob);
        var url = window.URL.createObjectURL(blob);
        const newAudio = new Audio(url);
        setAudio(newAudio);
        newAudio.play();
      }
    })();
  }, [playing]);

  return (
    <button
      onClick={() => {
        setPlaying(!playing);
      }}
    >
      {playing ? "Stopp" : "Spill"}
    </button>
  );
};
