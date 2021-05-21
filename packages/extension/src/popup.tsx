import React from "react";
import { useUrl } from "./effects"; 

export const Popup = () => {
  const url = useUrl()
return <div>current url {url}</div>
};
