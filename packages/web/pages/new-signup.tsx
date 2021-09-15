import * as ui from "@paperpod/ui";
import * as React from "react";

const Container = ui.styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px",
  borderRadius: "11.5px",
  border: "1px solid $action",
  variants: {
    disabled: {
      true: {
        borderColor: "rgba(171, 183, 183, .5)",
      },
    },
  },
});

const Input = ui.styled(ui.Input, {
  width: "100%",
  heigth: "54px",
  background: "none",
  border: 0,
  padding: 0,
  outline: "none",
});

const Button = ui.styled(ui.Button, {
  color: "$white",
  fontWeight: "bolder",
  height: "50px",
  width: "79px",
  borderStyle: "none",
  borderRadius: "11.5px",
  cursor: "pointer",
  outline: "none",
  scale: "1.049",
  backgroundColor: "$action",
  transitionTimingFunction: "ease-in",
  transitionProperty: "scale",
  transitionDuration: "1s",
  variants: {
    enlarge: {
      true: {
        scale: "1.049",
      },
    },
  },
  "&:disabled": {
    opacity: 0.79,
    backgroundColor: "$faded_action",
    "&:hover": {
      cursor: "default",
    },
  },
});

type Options = { placeholder: string; disabled: boolean };
const FlowInput = ({ placeholder, disabled }: Options) => (
  <Container disabled={disabled}>
    <Input placeholder={placeholder}></Input>
    <Button disabled={disabled} enlarge={!disabled}>
      <ui.icons.RightArrow color="white"></ui.icons.RightArrow>
    </Button>
  </Container>
);

const NewSignup = () => {
  const [disabled, setDisabled] = React.useState(false);
  React.useEffect(() => {
    const clear = setInterval(() => {
      setDisabled(!disabled);
    }, 2_000);
    return () => clearInterval(clear);
  }, []);
  return (
    <>
      <FlowInput disabled={false} placeholder="active" />
      <FlowInput disabled={true} placeholder="disabled" />
      <FlowInput disabled={disabled} placeholder="pulsing" />
    </>
  );
};

export default NewSignup;
