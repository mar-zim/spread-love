import React, { useState } from 'react'
import AddPeopleForm from '../components/AddPeopleForm'
import EncounterList from '../components/EncounterList'

export default function Home() {
  const [encounters, setEncounters] = useState([])
  return (
    <>
      <h2>Welcome!</h2>
      <AddPeopleForm encounters={encounters} setEncounters={setEncounters} />
      <EncounterList encounters={encounters} />
    </>
  )
}
