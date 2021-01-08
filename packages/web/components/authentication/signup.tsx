import { CREATED, get, post } from "node-kall";
import { models } from "common";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const Signup = () => {
  const { refreshUser } = useContext(UserContext);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const onClick = async () => {
    const [status, retrieved] = await post<models.UserCredentials>(
      "/authentication/users",
      {
        email,
        password,
      }
    );

    if (status === CREATED) {
      console.log("created a user: ", retrieved);
      refreshUser();
    }
  };
  return (
    <form action="/authentication/users" method="post">
      <div>
        <label>Email:</label>
        <input type="text" name="email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" />
      </div>
      <div>
        <input type="submit" value="Sign up" />
      </div>
    </form>
  );
};
