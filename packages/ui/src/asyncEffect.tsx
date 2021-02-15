import { useEffect } from "react";

/**
* Wraps `React.useEffect`, accepting an
* async function 
* @param action 
* @param on 
*/
//undo cache
export const asyncEffect = (action, on) =>
    useEffect(() => {
        action()
    }, on);
