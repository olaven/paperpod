export type Host = `http://localhost:${number}` | "https://paperpod.fm";

export const getHost = (): Promise<Host> =>
  new Promise((resolve, reject) => {
    {
      chrome.management.get(chrome.runtime.id, (info) => {
        const port = parseInt(process.env.GATEWAY_PORT);
        const hostname =
          info.installType === "development"
            ? (`http://localhost:${port}` as const)
            : "https://paperpod.fm";

        resolve(hostname);
      });
    }
  });
