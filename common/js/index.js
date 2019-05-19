const isOnline = () => {
  return window.navigator.onLine;
}

const saveToLocalStorage = (key, comment) => {
  localStorage.setItem(key, comment);
}

