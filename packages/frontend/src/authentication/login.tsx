import * as React from "react";
import { Input, Button } from "@paperpod/ui";

import { CREATED } from "node-kall";
import { authentication, fetchers } from "@paperpod/frontend";
import { logger } from "@paperpod/common";

export const Login: React.FunctionComponent = () => {
  const { setToken } = React.useContext(authentication.UserContext);
  const [email, setEmail] = React.useState<string>(null);
  const [password, setPassword] = React.useState<string>(null);

  const onLogin = async () => {
    const [status, response] = await fetchers.auth.login({
      email,
      password,
    });

    if (status === CREATED) {
      setToken(response.token);
    } else {
      logger.error(
        `Expected ${CREATED} when creating session, but got ${status}`
      );
      throw `${status} when creating session. Expected ${CREATED}`;
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
