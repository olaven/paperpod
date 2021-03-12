import { styled } from "./stitches.config";

export const Button = styled("button", {
    color: "$secondary",
    backgroundColor: "$primary",
    padding: "$thirteen",
    paddingLeft: "$fiftyfive",
    paddingRight: "$fiftyfive",
    margin: "$five",
    fontSize: "$twentyone",
    fontWeight: "lighter",
    outline: 'none',
    border: "solid 1px",
    borderRadius: "15px",
    transition: "all 0s ease 1s",
    "&:hover": {
        textDecoration: "underline",
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
