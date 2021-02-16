import { styled } from "@paperpod/ui";

export const Navbutton = styled("a", {
    fontSize: "$thirtyfour",
    fontWeight: "lighter",
    alignSelf: "end",
    flexGrow: 15,
    textAlign: "center",
    transition: "ease-in-out .1s",
    opacity: .9,
    "&:hover": {
        textDecoration: "underline",
        transform: "scale(1.13)",
        cursor: "pointer",
    },
    variants: {
        selected: {
            true: {
                textDecoration: "underline",
                transform: "scale(1.34)",
                opacity: 1,
                "&:hover": {
                    transform: "scale(1.34)",
                    opacity: 1,
                }
            }
        }
    }
});

