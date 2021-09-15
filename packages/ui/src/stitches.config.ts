// stitches.config.ts
import { createCss } from "@stitches/react";

export const { styled, css, getCssString } = createCss({
  theme: {
    fonts: {
      worksans: "'Work Sans', sans-serif",
    },
    colors: {
      white: "#FAFAF8",
      black: "black",
      error: "red",
      action: "#006A64", //dark green
      faded_action: "#648987", //dark green, faded
    },
    space: {
      one: "1px",
      two: "2px",
      three: "3px",
      five: "5px",
      eight: "8px",
      thirteen: "13px",
      twentyone: "21px",
      thirtyfour: "34px",
      fiftyfive: "55px",
      seventynine: "79px",
      onehunderedandfourteen: "114px",
    },
    fontSizes: {
      five: "5px",
      eight: "8px",
      thirteen: "13px",
      twentyone: "21px",
      thirtyfour: "34px",
      fiftyfive: "55px",
      seventynine: "79px",
      onehunderedandfourteen: "114px",
    },
  },
});
