import { useContext, useEffect } from "react";
import { UserContext } from "../components/authentication/UserContext";
import { asyncEffect } from "../helpers/asyncEffect";

const Index = () => {
  const { refreshUser } = useContext(UserContext);

  useEffect(() => {
    refreshUser();
  }, []);

  return <>Index</>;
};
export default Index;
