import { useEffect } from "react";

export const asyncEffect = (action: () => Promise<any>, triggers: any[]) =>
    useEffect(
        () => async () => {
            console.log("RUnning async action");
            await action();
        },
        triggers
    );
