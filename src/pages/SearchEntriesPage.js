import React, { useState } from 'react'
import EncounterList from '../components/EncounterList'
import Search from '../components/Search'
import { sortAllEncounters } from '../services/SortEntries'

export default function SearchEntriesPage({ encounters }) {
  const allEncountersSorted = sortAllEncounters(encounters)
  const [searchTerm, setSearchTerm] = useState('')

  const [display, setDisplay] = useState(false)

  const results = searchTerm
    ? allEncountersSorted.filter((encounter) =>
        encounter.friends.find((friend) =>
          friend.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : allEncountersSorted

  return (
    <>
      <h1>Search for entries</h1>
      <Search
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        setDisplay={setDisplay}
        display={display}
        encounters={encounters}
      />
      <EncounterList shownEntries={results} />
    </>
  )
}
