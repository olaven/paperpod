import { useContext } from "react";
import { authentication } from "@paperpod/frontend";

const Home = () => {
  const { user } = useContext(authentication.UserContext);
  return user ? (
    <div>you are logged in as {user.email}</div>
  ) : (
    <div>loading.</div>
  );
};

export default Home;
