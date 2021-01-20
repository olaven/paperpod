import { useContext } from "react";
import { Articles } from "../components/articles/Articles";
import {
  UserContext,
  Signup,
  Login,
  Logout,
} from "../components/authentication/authentication";
import { Feed } from "../components/feed/Feed";

const Index = () => {
  
  const { user } = useContext(UserContext);

  return (
    <>
      {!user && <Signup />}
      <br />
      {!user && <Login />}

      {user && <Logout />}
      {user && <>logged in as {user.email}</>}

      {user && <Articles />}

      {user && <Feed />}
    </>
  );
};
export default Index;
