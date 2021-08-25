import { styled } from "./stitches.config";

const commonTextStyles = {
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
} as const;

export const Paragraph = styled("p", { ...commonTextStyles });

export const H2 = styled("h2", {
  ...commonTextStyles,
  fontSize: "$fiftyfive",
});

export const H3 = styled("h3", {
  ...commonTextStyles,
  fontSize: "$thirtyfour",
});
