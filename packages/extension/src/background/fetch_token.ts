import { logger } from "@paperpod/common";
import { fetchers } from "@paperpod/frontend";
import { useLoggedInStorage, useSessionStorage } from "../storage/storage";

const { retrieve: retrieveLoggedIn, save: updateLoggedIn } =
  useLoggedInStorage();
const { retrieve: retrieveSessionToken, save: updateSessionToken } =
  useSessionStorage();

const fetchToken = async () => {
  const existingToken = await retrieveSessionToken();
  const [status, newToken] = await fetchers.auth.refreshToken(existingToken);

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

run().then(() => {
  logger.debug(`Running token background script`);
});
