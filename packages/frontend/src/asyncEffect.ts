import * as React from "react";

/**
 * Wraps `React.useEffect`, accepting an
 * async function
 * @param action
 * @param on
 */
export const asyncEffect = (action: () => Promise<any>, on: any[]) =>
  React.useEffect(() => {
    action();
  }, on);
