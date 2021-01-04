import { boot } from "common/src/server/boot";
import { createProxy } from "./proxy";


boot("", gateway => {

    const proxy = createProxy(gateway);
    const { API_PORT, AUTHENTICATION_PORT, WEB_PORT } = process.env;

    proxy("/api", "http://api:" + API_PORT);
    proxy("/authentication", "http://authentication:" + AUTHENTICATION_PORT);
    proxy("/", "http://web:" + WEB_PORT);
});