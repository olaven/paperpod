import { useContext } from "react";
import { UserContext } from "../components/UserContext";

const Login = () => {
  const { user } = useContext(UserContext);

  console.log("user here", user);
  return (
    <form action="/login" method="post">
      <div>
        <label>Email:</label>
        <input type="text" name="username" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" />
      </div>
      <div>
        <input type="submit" value="Log In" />
      </div>
    </form>
  );
};

export default Login;
