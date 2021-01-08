import { useContext, useEffect } from "react";
import { UserContext } from "../components/authentication/UserContext";
import { asyncEffect } from "../helpers/asyncEffect";

const Index = () => {
  const { user, refreshUser } = useContext(UserContext);

  asyncEffect(refreshUser, []);

  console.log("user in index: ", user);
  return <>Index</>;
};
export default Index;
