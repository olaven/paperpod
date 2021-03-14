import { useContext, useEffect, useState } from "react";
import { CREATED } from "node-kall";
import { useRouter } from "next/router";
import { Button, Input, Paragraph, styled } from "@paperpod/ui";
import { login } from "../components/authentication/authFetchers";
import { UserContext } from "../components/authentication/UserContext";

const Wrapper = styled("div", {
  width: "100vw",
  display: "flex",
  justifyContent: "center",

  small: {
    backgroundColor: "blue",
  },
});

const Container = styled("div", {
  width: "55vw",
  display: "flex",
  flexDirection: "column",

  small: {
    backgroundColor: "red",
    width: "100vw",
  },
});

const Login = () => {
  const { setToken } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const onLogin = async () => {
    const [status, response] = await login({
      email,
      password,
    });

    setToken(response?.token);
    setShowError(status !== CREATED);
  };

  return (
    <Wrapper>
      <Container>
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
        <Button onClick={onLogin} disabled={!(email && password)}>
          Login
        </Button>
        {showError && (
          <Paragraph error centered>
            An unknown error occured when logging in..
          </Paragraph>
        )}
      </Container>
    </Wrapper>
  );
};

export default Login;
