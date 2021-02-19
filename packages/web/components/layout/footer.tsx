import { styled, Paragraph } from "@paperpod/ui"

const Container = styled("footer", {
    height: "20vh",
    bottom: "-20vh",
    position: "absolute",
    left: 0,
    width: "100vw",
    fontSize: "$twentyone",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
});

export const Footer = () => <Container>
    <Paragraph>
        <a href="mailto:post@krets.app">Get in touch</a>
    </Paragraph>
    <Paragraph>Paperpod is made by Krets AS</Paragraph>
    <Paragraph>You are using an unfinished version of Paperpod. Visit <a href="https://github.com/olaven/paperpod">Github</a> to follow development</Paragraph>
</Container>;