import { Button, Input, styled } from "@paperpod/ui";

const FlowButtonContainer = styled("div", {
  backgroundColor: "orange",
  marginLeft: "$five $five $zero $zero",
  display: "flex",
  width: "$seventynine%",
  padding: "$five",
  paddingLeft: "$twentyone",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  borderRadius: "15px",
  border: "1px solid red",
});

const FlowInput = styled(Input, {
  width: "100%",
  heigth: "54px",
  background: "none",
  border: 0,
  padding: 0,
  outline: "none",
});

const FlowButton = styled(Button, {
  height: "54px",
  width: "94px",
  backgroundColor: "blue",
  color: "purple",
  borderStyle: "none",
  borderRadius: "15px",
  cursor: "pointer",
  outline: "none",
});

const NewSignup = () => (
  <FlowButtonContainer>
    <FlowInput></FlowInput>
    <FlowButton>OK!</FlowButton>
  </FlowButtonContainer>
);

export default NewSignup;
