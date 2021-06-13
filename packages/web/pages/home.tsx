import * as React from "react";
import { authentication, fetchers, FrontendContext } from "@paperpod/frontend";
import { Button } from "@paperpod/ui";
import { Articles } from "../components/articles/Articles";
import { Feed } from "../components/feed/Feed";

const Home = () => {
  const { user, token, setToken } = React.useContext(
    authentication.UserContext
  );
  const { serverHostname } = React.useContext(FrontendContext);

  const onLogOut = async () => {
    await fetchers.auth.logout(await token(), { serverHostname });
    setToken(null);
  };
  return user ? (
    <div>
      you are logged in as {user.email}
      <Button onClick={onLogOut}>Log out</Button>
      <Articles />
      <Feed />
    </div>
  ) : (
    <div>loading.</div>
  );
};

export default Home;
