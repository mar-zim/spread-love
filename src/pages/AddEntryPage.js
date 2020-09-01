import React from 'react'
import AddPeopleForm from '../components/AddPeopleForm'

export default function AddEntryPage({ encounters, setEncounters }) {
  return (
    <>
      <h2>Add new entries</h2>
      <AddPeopleForm encounters={encounters} setEncounters={setEncounters} />
    </>
  )
}
