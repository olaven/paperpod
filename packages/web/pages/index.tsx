import { useContext } from "react";
import { Articles } from "../components/articles/Articles";
import {
  UserContext,
  Signup,
  Login,
  Logout,
} from "../components/authentication/authentication";

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
    </>
  );
};
export default Index;
