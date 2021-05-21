import React, { useEffect, useState } from "react";
import { Paragraph } from "@paperpod/ui";
import { fetchers, asyncEffect } from "@paperpod/frontend";
import { useUrl } from "./effects";
import { logger } from "@paperpod/common";

const usePosting = (token: string) => {
  const url = useUrl();
  const [status, setStatus] =
    useState<"pending" | "posted" | "error">("pending");
  asyncEffect(async () => {
    if (!url) return;

    try {
      const [status, payload] = await fetchers.article.postArticle(
        {
          link: url,
        },
        token,
        "https://application.paperpod.fm"
      );

      if (status === 201) {
        setStatus("posted");
      } else {
        logger.debug(`Error posting article ${status} - ${url}`);
        setStatus("error");
      }
    } catch (error) {
      logger.error(error);
    }
  }, [url]);

  return status;
};

export const Popup = () => {
  const status = usePosting("SOME_TEST_TOKEN_REPLACE_ME");

  return (
    <>
      <h1>Paperpod</h1>
      <Paragraph>Post status: ${status}</Paragraph>
    </>
  );
};
