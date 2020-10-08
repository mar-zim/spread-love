import { useEffect, useState } from 'react'

export default function useAutocompleteOptions(encounters) {
  const [autocompleteOptions, setAutocompleteOptions] = useState([])

  useEffect(() => {
    let friendNameArray = []
    encounters.forEach((encounter) =>
      encounter.friends.forEach(
        (friend) => (friendNameArray = [...friendNameArray, friend.name])
      )
    )
    const uniqueNames = [...new Set(friendNameArray)]
    setAutocompleteOptions(uniqueNames)
  }, [])

  return autocompleteOptions
}
