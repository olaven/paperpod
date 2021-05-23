import * as React from "react";
import { Input, Button } from "@paperpod/ui";
import { models } from "@paperpod/common";
import { CREATED, post } from "node-kall";
import { authentication } from "@paperpod/frontend";

export const Login = () => {
  const { setToken, user } = React.useContext(authentication.UserContext);
  const [email, setEmail] = React.useState<string>(null);
  const [password, setPassword] = React.useState<string>(null);

  const onLogin = async () => {
    const [status, response] = await post<
      models.UserCredentials,
      models.TokenResponse
    >("/authentication/users/sessions", {
      email,
      password,
    });

    if (status === CREATED) {
      setToken(response.token);
    } else {
      throw status + " when creating session";
    }
  };

  return (
    <>
      <label>Email:</label>
      <Input
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <label>Password:</label>
      <Input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <Button onClick={onLogin}>Log in</Button>
    </>
  );
};