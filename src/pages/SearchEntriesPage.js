import React, { useState } from 'react'
import Button from '../components/Button'
import EncounterList from '../components/EncounterList'
import Search from '../components/Search'
import {
  sortAllEncounters,
  sortEncountersLast14Days,
} from '../services/SortEntries'

export default function SearchEntriesPage({ encounters }) {
  const [displayAllEncounters, setDisplayAllEncounters] = useState(true)

  const allEncountersSorted = sortAllEncounters(encounters)
  const encountersLast14DaysSorted = sortEncountersLast14Days(encounters)

  const selectedEncounters = displayAllEncounters
    ? allEncountersSorted
    : encountersLast14DaysSorted

  const [searchTerm, setSearchTerm] = useState('')

  const results = searchTerm
    ? selectedEncounters.filter((encounter) =>
        encounter.friends.find((friend) =>
          friend.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : selectedEncounters

  return (
    <>
      <h1>Search for entries</h1>
      <Search
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
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
