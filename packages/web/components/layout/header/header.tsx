import { styled } from "@paperpod/ui";
import Link from "next/link";
import { Image } from "./image";

const Container = styled("div", {
    width: "100vw",
    display: "flex",
    justifyContent: "flex-start",
});


export const Header = () => <Container>
    <Link href="/">
        <Image src="https://paperpod.fm/logo.svg" />
    </Link>
    {/* <Navbutton selected>Navbutton 1</Navbutton>
    <Navbutton>Navbutton 2</Navbutton>
    <Navbutton>Navbutton 3</Navbutton> */}
</Container>