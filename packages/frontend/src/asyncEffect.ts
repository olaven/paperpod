import { useEffect } from "react";

/**
 * Wraps `React.useEffect`, accepting an
 * async function
 * @param action
 * @param on
 */
export const asyncEffect = (action: () => Promise<any>, on: any[]) =>
  useEffect(() => {
    action();
  }, on);
