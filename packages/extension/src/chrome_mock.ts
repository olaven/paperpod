//TODO: type
export const withMockedChrome = (chrome: {}, action: () => void) => () => {
  const before = global.chrome;
  //@ts-expect-error NOTE: we are not adhering to the chrome namespace atm
  global.chrome = chrome;
  action();
  global.chrome = before;
};

export const chromeWithTabs = (...urls: string[]) => ({
  tabs: {
    query: (options: any, callback: (urls: { url: string }[]) => void) => {
      callback(urls.map((url) => ({ url })));
    },
  },
});
