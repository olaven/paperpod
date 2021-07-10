import { get } from "node-kall";
import { constants } from "@paperpod/common";

export const getAll = () => get(`${constants.APPLICATION_URL()}/health/all`);
