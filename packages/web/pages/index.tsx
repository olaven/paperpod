import { useContext } from "react";
import { UserContext } from "../components/authentication/authentication";
import { Paragraph, Button } from "@paperpod/ui";

const Index = () => {

  const { user } = useContext(UserContext);

  return <>
    <Paragraph>
      Paperpod turns articles and PDF files on the web into spoken audio.
    </Paragraph>
    <Paragraph>
      Save articles from your web browser or phone.
    </Paragraph>
    <Paragraph>
      Listen to them in the podcast player you already use.
    </Paragraph>

    <Paragraph>Sounds nice? {`<(^_^)>`}</Paragraph>

    <Button>Signup</Button>

    <Paragraph>Already signed up?</Paragraph>
    <Button>Login</Button>
  </>

};
export default Index;
