import { useContext } from "react";
import { UserContext } from "../components/authentication/authentication";
import { Paragraph, Button, styled } from "@paperpod/ui";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Index = () => {

  const { user } = useContext(UserContext);

  return <Container>
    <Paragraph size="larger">
      Paperpod turns articles and PDF files on the web into spoken audio. <br />
      Save articles from your web browser or phone. <br />
      Listen to them in the podcast player you already use. <br />
    </Paragraph>
    <Paragraph>
    </Paragraph>
    <Paragraph>
    </Paragraph>

    <Paragraph>Sounds nice? {`<(^_^)>`}</Paragraph>

    <Button>Signup</Button>

    <Paragraph>Already signed up?</Paragraph>
    <Button>Login</Button>
  </Container>
}

export default Index;
