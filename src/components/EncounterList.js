import React from 'react'

export default function EncounterList({ encounters }) {
  return (
    <>
      <h3>People you met</h3>
      {encounters.map((encounter) => (
        <div>{encounter.names}</div>
      ))}
    </>
  )
}
