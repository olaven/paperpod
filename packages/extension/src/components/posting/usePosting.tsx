import { logger } from "@paperpod/common";
import * as React from "react";
import { fetchers, asyncEffect, FrontendContext } from "@paperpod/frontend";

export const usePosting = (token: () => Promise<string>) => {
  const { serverHostname } = React.useContext(FrontendContext);
  const url = useUrl();
  const [status, setStatus] =
    React.useState<"pending" | "posted" | "error">("pending");
  asyncEffect(async () => {
    if (!url) return;

    const [status, payload] = await fetchers.article.postArticle(
      {
        link: url,
      },
      await token(),
      serverHostname
    );

    if (status === 201) {
      setStatus("posted");
    } else {
      logger.debug(`Error posting article ${status} - ${url}`);
      setStatus("error");
    }
  }, [url]);

  return status;
};

export const useUrl = () => {
  const [url, setUrl] = React.useState<string>(null);

  React.useEffect(() => {
    chrome.tabs.query(
      {
        active: true,
      },
      ([tab]) => {
        if (tab) setUrl(tab.url);
        else logger.debug(`No active chrome tab`);
      }
    );
  }, []);

  return url;
};
