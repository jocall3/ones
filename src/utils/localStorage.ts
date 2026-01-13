const isBrowser = typeof window !== 'undefined';

export const localStorageGetItem = (key: string): string | null => {
  if (!isBrowser) {
    return null;
  }

  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting item from localStorage: ${error}`);
    return null;
  }
};

export const localStorageSetItem = (key: string, value: string): void => {
  if (!isBrowser) {
    return;
  }

  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting item in localStorage: ${error}`);
  }
};

export const localStorageRemoveItem = (key: string): void => {
  if (!isBrowser) {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from localStorage: ${error}`);
  }
};

export const localStorageClear = (): void => {
  if (!isBrowser) {
    return;
  }

  try {
    localStorage.clear();
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`);
  }
};