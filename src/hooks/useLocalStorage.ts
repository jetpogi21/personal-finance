import { useState, useEffect } from "react";

type StorageKey = "token" | "username" | "email";

type UseLocalStorage = <T>(
  key: StorageKey,
  initialValue?: T | (() => T)
) => [T | null, (value: T | null) => void];

const useLocalStorage: UseLocalStorage = <T>(
  key: StorageKey,
  initialValue?: T | (() => T)
) => {
  const [value, setValue] = useState<T | null>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      return JSON.parse(storedValue) as T;
    } else if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue ?? null;
    }
  });

  useEffect(() => {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  const setStorageValue = (value: T | null) => setValue(value);

  return [value, setStorageValue];
};

export default useLocalStorage;
