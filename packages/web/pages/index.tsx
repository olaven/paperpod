import { useContext, useEffect } from "react";
import { UserContext } from "../components/authentication/UserContext";

const Index = () => {
  const { refreshUser } = useContext(UserContext);

  useEffect(() => {
    refreshUser();
  }, []);

  return <>Index</>;
};
export default Index;
