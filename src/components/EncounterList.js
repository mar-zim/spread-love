import React, { useState, useEffect } from 'react'
import ListItem from './ListItem'
import Search from './Search'

export default function EncounterList({ encounters }) {
  const sortedEncounters = encounters
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const [searchTerm, setSearchTerm] = useState('')
  const [autocompleteOptions, setAutocompleteOptions] = useState([])
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    let friendArray = []
    encounters.forEach(
      (encounter) => (friendArray = [...friendArray, ...encounter.friends])
    )
    setAutocompleteOptions(friendArray)
  }, [])

  console.log('Options:', autocompleteOptions)

  const results = searchTerm
    ? sortedEncounters.filter((sortedEncounter) =>
        sortedEncounter.friends.find((friend) =>
          friend.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : sortedEncounters

  return (
    <>
      <h3>People you met</h3>
      <Search
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        setDisplay={setDisplay}
        display={display}
        options={autocompleteOptions}
      />
      {results.length > 0 ? (
        results.map((encounter) => (
          <ListItem encounter={encounter} key={encounter.entryId} />
        ))
      ) : (
        <div>No entries</div>
      )}
    </>
  )
}
