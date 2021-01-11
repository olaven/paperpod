import { CREATED, get, post } from "node-kall";
import { models } from "common";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { setTokenSourceMapRange } from "typescript";

export const Signup = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const { setToken } = useContext(UserContext);

  const onClick = async () => {
    const [status, retrieved] = await post<models.UserCredentials>(
      "/authentication/users",
      { email: email, password: password }
    );

    if (status === CREATED) {
      //@ts-ignore
      setToken(retrieved.token);
    }
  };
  return (
    <>
      <label>Email:</label>
      <input
        type="text"
        name="email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={onClick} value="Sign up">
        sign up
      </button>
    </>
  );
};
