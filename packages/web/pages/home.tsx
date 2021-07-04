import * as React from "react";
import Link from "next/link";
import { authentication, fetchers, FrontendContext } from "@paperpod/frontend";
import { Button, A } from "@paperpod/ui";
import { SubscribeButton } from "../components/SubscribeButton";
import { Articles } from "../components/articles/Articles";
import { Feed } from "../components/feed/Feed";

const SubscribedUser = () => {
  const { user, token, setToken } = React.useContext(
    authentication.UserContext
  );
  const { serverHostname } = React.useContext(FrontendContext);

  const onLogOut = async () => {
    await fetchers.auth.logout(await token(), { serverHostname });
    setToken(null);
  };

  return (
    <div>
      you are logged in as {user.email}
      <Button onClick={onLogOut}>Log out</Button>
      <Articles />
      <Feed />
    </div>
  );
};

const NonSubscriber = () => (
  <>
    Subscribe for unrestricted access to Paperpod
    <SubscribeButton />
  </>
);

const Home = () => {
  const { user } = React.useContext(authentication.UserContext);

  return user ? (
    user.subscription === "active" ? (
      <SubscribedUser />
    ) : (
      <NonSubscriber />
    )
  ) : (
    <div>
      You are not logged in.
      <Button>
        <Link href="/login">
          <A>Log Back in</A>
        </Link>
      </Button>
    </div>
  );
};

export default Home;
