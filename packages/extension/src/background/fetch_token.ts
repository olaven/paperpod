import { logger } from "@paperpod/common";
import { fetchers } from "@paperpod/frontend";
import { getHost } from "../getServerHostName";
import { useLoggedInStorage, useSessionStorage } from "../storage/storage";

const { retrieve: retrieveLoggedIn, store: updateLoggedIn } =
  useLoggedInStorage();
const { retrieve: retrieveSessionToken, store: updateSessionToken } =
  useSessionStorage();

const fetchToken = async () => {
  const hostname = await getHost();
  const existingToken = await retrieveSessionToken();
  const [status, newToken] = await fetchers.auth.refreshToken(existingToken, {
    serverHostname: hostname,
  });

  if (status === 200) {
    await updateLoggedIn(true);
    await updateSessionToken(newToken);
  } else {
    updateLoggedIn(false);
  }
};

const run = async () => {
  const loggedIn = await retrieveLoggedIn();
  if (loggedIn) {
    setInterval(fetchToken, 1000 * 600); //i.e. ten minutes)
  }
};

logger.debug("AM her at all");
run().then(() => {
  logger.debug(`Running token background script`);
});
