import * as React from "react";
import Link from "next/link";
import { authentication, fetchers } from "@paperpod/frontend";
import { Button, A } from "@paperpod/ui";
import { SubscribeButton } from "../components/SubscribeButton";
import { Feed } from "../components/feed/Feed";
import { ExtensionLinks } from "../components/extensionlinks/ExtensionLinks";

const SubscribedUser = () => {
  const { user, token, setToken } = React.useContext(
    authentication.UserContext
  );

  const onLogOut = async () => {
    await fetchers.auth.logout(await token());
    setToken(null);
  };

  return (
    <div>
      Hello, {user.email}!
      <Feed />
      <ExtensionLinks />
      <Button onClick={onLogOut}>Log out</Button>
      {/* <Articles /> */}
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
