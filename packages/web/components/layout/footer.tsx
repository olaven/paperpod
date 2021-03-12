import { styled } from "@paperpod/ui";

const Container = styled("footer", {
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100vw",
  fontSize: "$twentyone",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "left",
});

export const Footer = () => (
  <Container>
    <a href="mailto:post@krets.app">Get in touch</a>
    <p>Paperpod is made by Krets AS</p>
    <p>
      You are using an unfinished version of Paperpod. Visit{" "}
      <a href="https://github.com/olaven/paperpod">Github</a> to follow
      development
    </p>
  </Container>
);
