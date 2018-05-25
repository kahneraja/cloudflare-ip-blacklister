class JsonStore {
  set(key, value) {
    let json = JSON.stringify(value)
    localStorage.setItem(key, json);
  }
  get(key) {
    return JSON.parse(localStorage.getItem(key))
  }
}

export default JsonStore