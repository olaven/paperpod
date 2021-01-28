import { CREATED } from "node-kall";
import { validators } from "@paperpod/common";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { signup } from "./authFetchers";

export const Signup = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [validPassword, setValidPassword] = useState(false);

  const { setToken } = useContext(UserContext);

  const onClick = async () => {
    const [status, response] = await signup({ email, password });

    if (status === CREATED) {
      setToken(response.token);
    }
  };

  useEffect(() => {

    if (!password) return;
    setValidPassword(
      validators
        .validatePassword(
          password
        )
    )
  }, [password]);

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

      <button
        onClick={onClick}
        disabled={!validPassword}
        value="Sign up">
        sign up
      </button>
      {!validPassword && <p>
        Enter a stronger password
      </p>}
    </>
  );
};
