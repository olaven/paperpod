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

    "small": {
        backgroundColor: "blue"
    }
});

const Container = styled("div", {
    width: "55vw",
    display: "flex",
    flexDirection: "column",

    "small": {
        backgroundColor: 'red',
        width: "100vw"
    }
});

const Login = () => {

    const { token, setToken } = useContext(UserContext);
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);

    useEffect(() => {

        if (token) {
            router.push("/home");
        }
    }, [token]);

    const onLogin = async (event) => {

        const [status, response] = await login({
            email, password
        });

        if (status === CREATED) {

            setToken(response.token);
            setShowError(false);
        } else {

            setShowError(true);
        }
    }

    return <Wrapper>
        <Container>
            <Input onChange={(event) => { setEmail(event.target.value) }} placeholder="your@email.com" type="mail"></Input>
            <Input onChange={(event) => { setPassword(event.target.value) }} placeholder="your password" type="password"></Input>
            <Button onClick={onLogin} disabled={!(email && password)}>Login</Button>
            {showError && <Paragraph error centered>
                An unknown error occured when logging in..
            </Paragraph>}
        </Container>
    </Wrapper>
}

export default Login;