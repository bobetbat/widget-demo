import { useState, useEffect } from 'react';

type SetValue<T> = (value: T | ((val: T) => T)) => void;

const useLocalStorage = <T,>(key: string, initialValue: T | null = null): [T | null, SetValue<T>] => {
  // Function to safely parse JSON stored in localStorage
  const readValue = (): T | null => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T | null>(readValue);

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window !== 'undefined') {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key) {
          setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [key, initialValue]);

  const setValue: SetValue<T> = value => {
    if (typeof window !== 'undefined') {
      try {
        const valueToStore = value instanceof Function ? value(storedValue as T) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    } else {
      console.warn(`window is not defined. Cannot set localStorage key “${key}”.`);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
