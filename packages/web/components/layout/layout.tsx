import { logger } from "@paperpod/common";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { authentication } from "@paperpod/frontend";
import { Footer } from "./footer";
import { Header } from "./header/header";

export const Layout = (props) => {
  const { user } = useContext(authentication.UserContext);
  const router = useRouter();
  useEffect(() => {
    logger.debug("user here", user);
    if (user) {
      router.push("/home");
    }
  }, [user]);

  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};
