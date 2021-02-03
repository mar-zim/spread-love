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

export function deleteFromLocal(keyName, id, updateArray) {
  const storedArray = loadFromLocal(keyName) || []
  const removeIndex = storedArray.findIndex(
    (encounter) => encounter.entryId === id
  )
  storedArray.splice(removeIndex, 1)
  updateArray(storedArray)
}
