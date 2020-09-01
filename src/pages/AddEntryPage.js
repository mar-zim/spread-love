import React from 'react'
import AddPeopleForm from '../components/AddPeopleForm'

export default function AddEntryPage({ encounters, setEncounters }) {
  return (
    <>
      <h1>Add people you met</h1>
      <AddPeopleForm encounters={encounters} setEncounters={setEncounters} />
    </>
  )
}
