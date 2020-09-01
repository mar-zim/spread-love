import React from 'react'
import AddPeopleForm from '../components/AddPeopleForm'

export default function AddEntryPage({ encounters, setEncounters }) {
  return (
    <>
      <h2>Add people you met</h2>
      <AddPeopleForm encounters={encounters} setEncounters={setEncounters} />
    </>
  )
}
