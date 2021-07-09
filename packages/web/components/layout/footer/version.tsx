import * as React from "react";
import { styled } from "@paperpod/ui";
import { OK } from "node-kall";
import { asyncEffect, fetchers } from "@paperpod/frontend";
import { logger } from "@paperpod/common";

const Container = styled("div", {
  width: "10%",
  position: "relative",

  p: {
    fontWeight: "lightest",
    fontSize: ".79em",
    position: "absolute",
    bottom: -30,
    left: 0,
  },
});

const useVersion = () => {
  const [version, setVersion] = React.useState("");
  asyncEffect(async () => {
    const [status, response] = await fetchers.health.getAll();
    if (status === OK) {
      setVersion(response.version);
    } else {
      logger.warn({
        message: `Error getting version`,
        status,
        version,
        response,
      });
    }
  }, []);

  return version;
};

export const Version = () => {
  const version = useVersion();
  return (
    <Container>
      <p>v{version}</p>
    </Container>
  );
};
