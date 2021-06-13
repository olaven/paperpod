import { logger } from "@paperpod/common";

type Key = "paperpod.session_token" | "paperpod.logged_in"; // add more when needed

export const useLoggedInStorage = () =>
  usePermanentStorage<boolean>("paperpod.logged_in");

export const useSessionStorage = () =>
  usePermanentStorage<string>("paperpod.logged_in");

const store =
  <T>(key: Key) =>
  (value: T) =>
    new Promise<void>((resolve, reject) => {
      logger.debug(`Going to store ${key} as ${value} in chrome storage`);
      chrome.storage.sync.set({ [key]: value }, () => {
        resolve();
      });
    });

const retrieve =
  <T>(key: Key) =>
  () =>
    new Promise<T>((resolve, reject) => {
      chrome.storage.sync.get([key], (result) => {
        if (!result) resolve(null);
        resolve(result[key]);
      });
    });

const usePermanentStorage = <T>(key: Key) => {
  return { store: store<T>(key), retrieve: retrieve<T>(key) };
};
