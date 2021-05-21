import React from "react";
import { Button, Paragraph } from "@paperpod/ui";
import { useUrl } from "./effects";

const postArticle;

export const Popup = () => {
  const url = useUrl();

  const onClick = () => {
    window.close();
  };

  return (
    <>
      <h1>Paperpod</h1>
      <Paragraph>current url {url}</Paragraph>
      <Button onClick={onClick}>Close me</Button>
    </>
  );
};
