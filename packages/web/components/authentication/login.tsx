import { models } from "common";
import { CREATED, post } from "node-kall";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const Login = () => {
  const { setToken, user } = useContext(UserContext);
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);

  const onLogin = async () => {
    const [status, response] = await post<
      models.UserCredentials,
      models.TokenResponse
    >("/authentication/users/session", {
      email,
      password,
    });

    if (status === CREATED) {
      setToken(response.token);
      console.log("Got a token", response.token);
    } else {
      throw status + " when creating session";
    }
  };

  console.log(user);
  return (
    <>
      <label>Email:</label>
      <input
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={onLogin}>Log in</button>
    </>
  );
};
