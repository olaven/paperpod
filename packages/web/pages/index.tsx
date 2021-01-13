import { useContext } from "react";
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

      {user && <>logged in as {user.email}</>}
      {user && <Logout />}
    </>
  );
};
export default Index;
