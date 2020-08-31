import React from 'react'
import ListItem from './ListItem'

export default function EncounterList({ encounters }) {
  return (
    <>
      <h3>People you met</h3>
      {encounters.map((encounter) => (
        <ListItem encounter={encounter} key={encounter.entryId} />
      ))}
    </>
  )
}
