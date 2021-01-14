export const bearer = (token: string) => ({
    headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
    }
})
