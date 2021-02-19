import { Paragraph, Button, A, styled } from "@paperpod/ui";
import Link from "next/link";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Index = () => {

  return <Container>
    <Paragraph size="larger">
      - Turn any article or PDF file on the web into spoken audio. <br />
      - Save from your web browser or phone. <br />
      - Listen to them in the podcast player you already use. <br />
    </Paragraph>

    <Paragraph>Sounds nice? {`<(^_^)>`}</Paragraph>

    <Button>Signup</Button>

    <Paragraph>Already signed up?</Paragraph>
    <Button>
      <Link href="/login">
        <A>Login</A>
      </Link>
    </Button>
  </Container>
}

export default Index;
