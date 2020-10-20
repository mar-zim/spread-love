import React from 'react'
import ListItem from './ListItem'

export default function EncounterList({ shownEntries, setEncounters }) {
  return (
    <>
      {shownEntries.length > 0 ? (
        shownEntries.map((entry) => (
          <ListItem
            encounter={entry}
            key={entry.entryId}
            setEncounters={setEncounters}
          />
        ))
      ) : (
        <div>No entries</div>
      )}
    </>
  )
}
