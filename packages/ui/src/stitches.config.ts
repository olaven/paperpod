// stitches.config.ts
import { createCss } from "@stitches/react";

export const { styled, css, getCssString } = createCss({
  theme: {
    colors: {
      primary: "white",
      secondary: "black",
      grey: "hsl(0, 0%, 36%)",
      error: "red",
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
