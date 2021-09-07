export { Button } from "./button";
export { Input } from "./input";
export { Paragraph, H2, H3 } from "./text";
export { A } from "./a";
export * as icons from "./icons";
//NOTE: needed to set up server side rendering in next apps. (https://stitches.dev/blog/using-nextjs-with-stitches)
export { getCssString, styled } from "./stitches.config";
