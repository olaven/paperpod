import fetch from "node-fetch";
import "@testing-library/jest-dom/extend-expect";

//@ts-ignore
window.HTMLMediaElement.prototype.load = () => {
  /* do nothing */
};
//@ts-ignore
window.HTMLMediaElement.prototype.play = () => {
  /* do nothing */
};
//@ts-ignore
window.HTMLMediaElement.prototype.pause = () => {
  /* do nothing */
};
//@ts-ignore
window.HTMLMediaElement.prototype.addTextTrack = () => {
  /* do nothing */
};
//@ts-ignore
global.fetch = fetch;
