import React from "react";
import { Paragraph } from "@paperpod/ui"
import { useUrl } from "./effects"; 

export const Popup = () => {

  const url = useUrl()
  return <>
    <h1>Paperpod</h1>
  <Paragraph>
    current url {url}
    </Paragraph></>
};
