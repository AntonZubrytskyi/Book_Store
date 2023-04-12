const localStorageHelper = {
  setToLocalStorage: (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getFromLocalStorage: (key: string) => {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : '';
  },
  clearLocalStorage: () => localStorage.clear(),
};

export { localStorageHelper };
