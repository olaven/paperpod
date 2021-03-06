import { styled } from "./stitches.config";

export const Paragraph = styled("p", {
  fontFamily: "Roboto, sans-serif",
  fontWeight: "lighter",
  fontSize: "$twentyone",
  lineHeight: "34px",

  variants: {
    size: {
      larger: {
        fontSize: "$thirtyfour",
        lineHeight: "55px",
      },
    },
    error: {
      true: {
        color: "$error",
      },
    },
    centered: {
      true: {
        textAlign: "center",
        alignSelf: "center",
        justifySelf: "center",
      },
    },
  },
});
