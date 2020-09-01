import React from 'react'
import ListItem from './ListItem'

export default function EncounterList({ shownEntries }) {
  return (
    <>
      {shownEntries.length > 0 ? (
        shownEntries.map((encounter) => (
          <ListItem encounter={encounter} key={encounter.entryId} />
        ))
      ) : (
        <div>No entries</div>
      )}
    </>
  )
}
