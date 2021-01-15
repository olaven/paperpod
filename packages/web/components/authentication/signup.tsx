import { CREATED, get, post } from "node-kall";
import { models } from "@paperpod/common";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { signup } from "./authFetchers";

export const Signup = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const { setToken } = useContext(UserContext);

  const onClick = async () => {
    const [status, response] = await signup({ email, password });

    if (status === CREATED) {
      setToken(response.token);
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
