import * as ui from "@paperpod/ui";

const Container = ui.styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "11.5px",
  border: "1px inset $action",
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
  backgroundColor: "$action",
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
  <Container>
    <Input placeholder={placeholder}></Input>
    <Button disabled={disabled}>
      <ui.icons.RightArrow color="white"></ui.icons.RightArrow>
    </Button>
  </Container>
);

const NewSignup = () => (
  <>
    <FlowInput disabled={false} placeholder="active" />
    <FlowInput disabled={true} placeholder="disabled" />
  </>
);

export default NewSignup;
