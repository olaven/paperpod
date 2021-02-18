import { styled, Paragraph } from "@paperpod/ui"

const Container = styled("footer", {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100vw",
    fontSize: "$twentyone",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "left"
});

export const Footer = () => <Container>
    <Paragraph>
        <a href="mailto:post@krets.app">Get in touch</a>
    </Paragraph>
    <Paragraph>Paperpod is made by Krets AS</Paragraph>
    <Paragraph>You are using an unfinished version of Paperpod. Visit <a href="https://github.com/olaven/paperpod">Github</a> to follow development</Paragraph>
</Container>;