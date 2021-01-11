import { CREATED, post } from "node-kall";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const Login = () => {
  const { setToken } = useContext(UserContext);
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);

  const onLogin = async () => {
    const [status, body] = await post("/authentication/users/session", {
      email,
      password,
    });

    if (status === CREATED) {
      //@ts-ignore
      setToken(body.token);
    } else {
      console.log("Hello", status);
    }
  };
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
