//TODO: type
export const withMockedChrome = (chrome: {}, action: () => void) => () => {
  //@ts-expect-error NOTE: we are not adhering to the chrome namespace atm
  global.chrome = chrome;
  action();
};

export const chromeWithTabs = (...urls: string[]) => ({
  tabs: {
    query: (options: any, callback: (urls: { url: string }[]) => void) => {
      callback(urls.map((url) => ({ url })));
    },
  },
});

export const withMockedFetch =
  (
    response: Partial<Response>,
    action: (response: Partial<Response>) => void
  ) =>
  () => {
    const before = global.fetch;
    //@ts-expect-error NOTE: we're only accepting a partial response, causing the below assignment to be invalid
    global.fetch = async () => response;
    action(response);
    global.fetch = before;
  };
