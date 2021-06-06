import * as React from "react";
import { Input, Button } from "@paperpod/ui";
import { logger } from "@paperpod/common";

import { CREATED } from "node-kall";
import { authentication, fetchers } from "@paperpod/frontend";
import { FrontendContext } from "../FrontendContext";

export const Login = () => {
  const { setToken, user } = React.useContext(authentication.UserContext);
  const [email, setEmail] = React.useState<string>(null);
  const [password, setPassword] = React.useState<string>(null);

  const { serverHostname } = React.useContext(FrontendContext);

  const onLogin = async () => {
    const [status, response] = await fetchers.auth.login(
      {
        email,
        password,
      },
      { serverHostname }
    );

    if (status === CREATED) {
      setToken(response.token);
      logger.debug(`token after login is ${response.token}`);
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
