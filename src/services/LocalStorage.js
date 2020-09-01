export function saveToLocal(keyName, data) {
  localStorage.setItem(keyName, JSON.stringify(data))
}

export function loadFromLocal(keyName) {
  try {
    return JSON.parse(localStorage.getItem(keyName))
  } catch (error) {
    console.log(error.message)
  }
}
