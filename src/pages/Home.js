import React, { useState, useEffect } from 'react'
import AddPeopleForm from '../components/AddPeopleForm'
import EncounterList from '../components/EncounterList'
import { saveToLocal, loadFromLocal } from '../services/LocalStorage'

export default function Home() {
  const [encounters, setEncounters] = useState(
    loadFromLocal('encounterList') || []
  )
  console.log(encounters)

  useEffect(() => {
    saveToLocal('encounterList', encounters)
  }, [encounters])

  return (
    <>
      <h2>Welcome!</h2>
      <AddPeopleForm encounters={encounters} setEncounters={setEncounters} />
      <EncounterList encounters={encounters} />
    </>
  )
}
