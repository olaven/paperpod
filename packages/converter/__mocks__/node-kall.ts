export const get = async () =>
    [200, {}];

export const filterResponse = async () => ({
    headers: () => ({
        "Content-Type": "application/json" //NOTE: not pdf 
    })
})