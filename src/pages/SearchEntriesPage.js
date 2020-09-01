import React, { useState } from 'react'
import EncounterList from '../components/EncounterList'
import Search from '../components/Search'
import {
  sortAllEncounters,
  sortEncountersLast14Days,
} from '../services/SortEntries'
import Button from '../components/Button'

export default function SearchEntriesPage({ encounters }) {
  const [displayAllEncounters, setDisplayAllEncounters] = useState(true)
  const allEncountersSorted = sortAllEncounters(encounters)
  const encountersLast14DaysSorted = sortEncountersLast14Days(encounters)
  const selectedEncounters = displayAllEncounters
    ? allEncountersSorted
    : encountersLast14DaysSorted
  const [searchTerm, setSearchTerm] = useState('')
  const [display, setDisplay] = useState(false)

  const results = searchTerm
    ? selectedEncounters.filter((encounter) =>
        encounter.friends.find((friend) =>
          friend.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : selectedEncounters

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
      <h2>{displayAllEncounters ? 'All entries' : 'Entries last 14 days'}</h2>
      <Button
        onClick={() => setDisplayAllEncounters(!displayAllEncounters)}
        text={displayAllEncounters ? 'Show last 14 days' : 'Show all entries'}
      ></Button>
      <EncounterList shownEntries={results} />
    </>
  )
}
