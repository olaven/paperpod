import { styled } from "./stitches.config";

export const Button = styled("button", {
    color: "$secondary",
    backgroundColor: "$primary",
    padding: "$three",
    margin: "$three",
    fontSize: "$twentyone",
    border: "border solid",
    borderRadius: "6px",
    transition: "all 0.1s ease 0s",
    "&:hover": {
        transform: "scale(1.025)",
        cursor: "pointer",
    },
    "&:disabled": {
        color: "grey",
        opacity: .79,
        "&:hover": {
            transform: "scale(1)",
            cursor: "default",
        }
    }
});
