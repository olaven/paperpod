export const get = async () =>
    [200, {}];

export const filterResponse = async () => ({
    headers: {
        get: () => "application/json" //NOTE: not pdf 
    }
})