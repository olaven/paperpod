type Key = "paperpod.session_token" | "paperpod.logged_in"; // add more when needed

export const store = <T>(key: Key, value: T) =>
  new Promise<void>((resolve, reject) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      resolve();
    });
  });

export const get = <T> (key: Key) =>
  new Promise<T>((resolve, reject) => {
    chrome.storage.sync.get([key], (result) => {
      resolve(result[key]);
    });
  });
