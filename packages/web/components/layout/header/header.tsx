import { styled } from "@paperpod/ui";
import { Image } from "./image";

const Container = styled("div", {
    width: "100vw",
    display: "flex",
    justifyContent: "flex-start",
});


export const Header = () => <Container>
    <Image src="https://paperpod.fm/logo.svg" />
    {/* <Navbutton selected>Navbutton 1</Navbutton>
    <Navbutton>Navbutton 2</Navbutton>
    <Navbutton>Navbutton 3</Navbutton> */}
</Container>