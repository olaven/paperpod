import { useContext } from "react";
import { Articles } from "../components/articles/Articles";
import {
  UserContext,
  Signup,
  Login,
  Logout,
} from "../components/authentication/authentication";
import Test from "./test";

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
      <Test />
    </>
  );
};
export default Index;
