import React, { useState, useEffect } from 'react'
import ListItem from './ListItem'
import Search from './Search'

export default function EncounterList({ encounters }) {
  const allEncountersSorted = encounters
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const currentDate = new Date()
  const currentDateTime = currentDate.getTime()
  const last14DaysDate = new Date(
    currentDate.setDate(currentDate.getDate() - 14)
  )
  const last14DaysDateTime = last14DaysDate.getTime()

  const last14DaysEncountersSorted = encounters
    .filter((encounter) => {
      const elementDateTime = new Date(encounter.date).getTime()
      if (
        elementDateTime <= currentDateTime &&
        elementDateTime > last14DaysDateTime
      ) {
        return true
      }
      return false
    })
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })

  const [searchTerm, setSearchTerm] = useState('')
  const [autocompleteOptions, setAutocompleteOptions] = useState([])
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    let friendFirstNameArray = []
    encounters.forEach((encounter) =>
      encounter.friends.forEach(
        (friend) =>
          (friendFirstNameArray = [...friendFirstNameArray, friend.firstName])
      )
    )
    const uniqueFirstNames = [...new Set(friendFirstNameArray)]
    setAutocompleteOptions(uniqueFirstNames)
  }, [])

  const results = searchTerm
    ? last14DaysEncountersSorted.filter((encounter) =>
        encounter.friends.find((friend) =>
          friend.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : last14DaysEncountersSorted

  return (
    <>
      <h3>People you met in the last 14 days</h3>
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
