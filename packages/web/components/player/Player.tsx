import * as React from "react";
import { logger } from "@paperpod/common";
import { authentication } from "@paperpod/frontend";
import { fetchers } from "@paperpod/frontend";
import { Button } from "@paperpod/ui";

export const Player = ({ article_id }: { article_id: string }) => {
  const { token } = React.useContext(authentication.UserContext);
  const [playing, setPlaying] = React.useState(false);
  const [audio, setAudio] = React.useState(new Audio());

  React.useEffect(() => {
    (async () => {
      if (!playing) {
        audio.pause();
      } else {
        const response = await fetchers.player.fetchFile(
          article_id,
          await token()
        );
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
    <Button
      onClick={() => {
        setPlaying(!playing);
      }}
    >
      {playing ? "Stopp" : "Spill"}
    </Button>
  );
};
