import React from 'react'
import EncounterList from '../components/EncounterList'
import { sortEncountersLast14Days } from '../services/SortEntries'

export default function HomePage({ encounters }) {
  const encountersLast14Days = sortEncountersLast14Days(encounters)

  return (
    <>
      <h2>Welcome!</h2>
      <div>
        Below you see your list of friends, you met in the last 14 days. If you
        want to add a new meeting with a freind, got to "Add", if you want to
        search for meetings with specific friends, go to "Search".
      </div>
      <h4>These were your encounters in the last 14 days</h4>
      <EncounterList shownEntries={encountersLast14Days} />
    </>
  )
}
