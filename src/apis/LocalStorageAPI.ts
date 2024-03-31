
let prefix = ''

console.log(process.env.PUBLIC_URL);

if (process.env.PUBLIC_URL !== "") {
  prefix = 'staging';
}

const getKey = (key) => `${prefix}${prefix !== "" ? '-': ''}${key}`

export const LocalStorageAPI = {
  getItem: (key) => {
    return localStorage.getItem(getKey(key));
  },
  setItem: (key, value) => {
    localStorage.setItem(getKey(key), value)
  },
  removeItem: (key) => {
    localStorage.removeItem(getKey(key));
  }
}