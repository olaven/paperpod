import { Paragraph, Button, A, styled } from "@paperpod/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { authentication } from "@paperpod/frontend";

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Index = () => {
  const { user } = useContext(authentication.UserContext);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  return (
    <Container>
      <Paragraph size="larger">
        - Turn any article or PDF file on the web into spoken audio. <br />
        - Save from your web browser or phone. <br />
        - Listen to them in the podcast player you already use. <br />
      </Paragraph>

      <Paragraph>Sounds nice? {`<(^_^)>`}</Paragraph>

      <Button>
        <Link href="/signup">
          <A>Signup</A>
        </Link>
      </Button>

      <Paragraph>Already signed up?</Paragraph>
      <Button>
        <Link href="/login">
          <A>Login</A>
        </Link>
      </Button>
    </Container>
  );
};

export default Index;
