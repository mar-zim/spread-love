import React from 'react'
import EncounterList from '../components/EncounterList'
import { sortEncountersLast14Days } from '../services/SortEntries'

export default function HomePage({ encounters }) {
  const encountersLast14Days = sortEncountersLast14Days(encounters)

  return (
    <>
      <h1>Welcome!</h1>
      <div>
        Below you see your list of friends, you met in the last 14 days. If you
        want to add a new meeting with a freind, got to "Add", if you want to
        search for meetings with specific friends, go to "Search".
      </div>
      <h2>Last 14 days</h2>
      <EncounterList shownEntries={encountersLast14Days} />
    </>
  )
}
