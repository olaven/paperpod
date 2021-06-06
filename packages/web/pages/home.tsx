import * as React from "react";
import { authentication, fetchers } from "@paperpod/frontend";
import { Button } from "@paperpod/ui";

const Home = () => {
  const { user, token, setToken } = React.useContext(
    authentication.UserContext
  );

  const onLogOut = async () => {
    await fetchers.auth.logout(token);
    setToken(null);
  };
  return user ? (
    <div>
      you are logged in as {user.email}
      <Button onClick={onLogOut}>Log out</Button>
    </div>
  ) : (
    <div>loading.</div>
  );
};

export default Home;
