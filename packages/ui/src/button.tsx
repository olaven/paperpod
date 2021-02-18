import { styled } from "./stitches.config";

export const Button = styled("button", {
    color: "$secondary",
    backgroundColor: "$primary",
    padding: "$thirteen",
    margin: "$five",
    fontSize: "$twentyone",
    outline: 'none',
    border: "border solid 1px",
    borderRadius: "10px",
    transition: "all 0.1s ease 0s",
    "&:hover": {
        opacity: ".79",
        cursor: "pointer",
    },
    "&:disabled": {
        color: "grey",
        opacity: .79,
        "&:hover": {
            cursor: "default",
        }
    }
});
