import { CREATED } from "node-kall";
import { useContext, useEffect, useState } from "react";
import { fetchers } from "@paperpod/frontend";
import { Input, Button, Paragraph, styled } from "@paperpod/ui";
import { authentication } from "@paperpod/frontend";
import { validators } from "@paperpod/common";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const Signup = () => {
  const { token, setToken } = useContext(authentication.UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!email) return;

    const validEmail = validators.validateEmail(email);
    const validPassword = validators.validatePassword(password);
    const equalPassword = password === repeatedPassword;

    setError(null);
    if (!validEmail) setError("Invalid email");
    if (validEmail && !validPassword) setError("Password is not strong enough");
    if (!equalPassword) setError("Passwords do not match");
  }, [email, password, repeatedPassword]);

  const onSignup = async () => {
    const [status, response] = await fetchers.auth.signup({ email, password });

    if (status === CREATED) {
      setToken(response.token);
    }
  };

  return (
    <Container>
      <h2>1/2 - Your login details</h2>
      <Input
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        placeholder="your@email.com"
        type="mail"
      ></Input>
      <Input
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        placeholder="super secret password"
        type="password"
      ></Input>
      <Input
        onChange={(event) => {
          setRepeatedPassword(event.target.value);
        }}
        placeholder="repeat your password"
        type="password"
      ></Input>
      {error && (
        <Paragraph error centered>
          {error}
        </Paragraph>
      )}
      <h2>2/2 - Your payment details</h2>
      <Input
        onChange={() => {
          throw "not implemented";
        }}
        placeholder="card number"
        type="text"
      ></Input>
      <Input
        onChange={() => {
          throw "not implemented";
        }}
        placeholder="name on card"
        type="text"
      ></Input>
      <Input
        onChange={() => {
          throw "not implemented";
        }}
        placeholder="CVC"
        type="text"
      ></Input>
      <Button onClick={onSignup} disabled={!(email && password)}>
        Completed
      </Button>
    </Container>
  );
};

export default Signup;
