import * as React from "react";
import { CREATED } from "node-kall";
import { validators } from "@paperpod/common";
import { Button, Input } from "@paperpod/ui";
import { fetchers } from "@paperpod/frontend";
import { authentication } from "@paperpod/frontend";
import { FrontendContext } from "../FrontendContext";

export const Signup = () => {
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [validPassword, setValidPassword] = React.useState(false);

  const { setToken } = React.useContext(authentication.UserContext);
  const { serverHostname } = React.useContext(FrontendContext);

  const onClick = async () => {
    const [status, response] = await fetchers.auth.signup(
      { email, password },
      { serverHostname }
    );

    if (status === CREATED) {
      setToken(response.token);
    }
  };

  React.useEffect(() => {
    if (!password) return;
    setValidPassword(validators.validatePassword(password));
  }, [password]);

  return (
    <>
      <label>Email:</label>
      <Input
        type="text"
        name="email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <label>Password:</label>
      <Input
        type="password"
        name="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <Button onClick={onClick} disabled={!validPassword} value="Sign up">
        sign up
      </Button>
      {!validPassword && <p>Enter a stronger password</p>}
    </>
  );
};
