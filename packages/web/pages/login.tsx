import { useContext, useState } from "react";
import { CREATED } from "node-kall";
import { Button, Input, Paragraph, styled } from "@paperpod/ui";
import { fetchers } from "@paperpod/frontend";
import { authentication } from "@paperpod/frontend";

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
  const { setToken } = useContext(authentication.UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const onLogin = async () => {
    const [status, response] = await fetchers.auth.login({
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
