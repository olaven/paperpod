type Key = "paperpod.session_token" | "paperpod.logged_in"; // add more when needed

export const useLoggedInStorage = () =>
  usePermanentStorage<boolean>("paperpod.logged_in");

export const useSessionStorage = () =>
  usePermanentStorage<string>("paperpod.logged_in");

const save =
  <T>(key: Key) =>
  (value: T) =>
    new Promise<void>((resolve, reject) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        resolve();
      });
    });

const retrieve =
  <T>(key: Key) =>
  () =>
    new Promise<T>((resolve, reject) => {
      chrome.storage.sync.get([key], (result) => {
        resolve(result[key]);
      });
    });

const usePermanentStorage = <T>(key: Key) => {
  return [save<T>(key), retrieve<T>(key)];
};
