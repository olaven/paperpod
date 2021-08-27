import { logger } from "@paperpod/common";
import { fetchers } from "@paperpod/frontend";
import { useLoggedInStorage, useSessionStorage } from "../storage/storage";

const { retrieve: retrieveLoggedIn, store: updateLoggedIn } =
  useLoggedInStorage();
const { retrieve: retrieveSessionToken, store: updateSessionToken } =
  useSessionStorage();

const fetchToken = async () => {
  const existingToken = await retrieveSessionToken();
  const [status, newToken] = await fetchers.auth.refreshToken(existingToken);

  if (status === 200) {
    await Promise.all([updateLoggedIn(true), updateSessionToken(newToken)]);
  } else {
    updateLoggedIn(false);
  }
};

const run = async () => {
  const loggedIn = await retrieveLoggedIn();
  if (loggedIn) {
    setInterval(fetchToken, 10 * 60 * 1000); //i.e. ten minutes)
  }
};

logger.debug("AM her at all");
run().then(() => {
  logger.debug(`Running token background script`);
});
