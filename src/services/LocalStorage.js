export function saveToLocal(name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

export function loadFromLocal(name) {
  try {
    return JSON.parse(localStorage.getItem(name))
  } catch (error) {
    console.log(error.message)
  }
}
