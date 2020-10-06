import React from 'react'
import EncounterList from '../components/EncounterList'
import { sortEncountersLast14Days } from '../services/SortEntries'

export default function HomePage({ encounters }) {
  const encountersLast14Days = sortEncountersLast14Days(encounters)

  return (
    <>
      <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="logo" />
      <div>
        Below you see your list of friends, you met in the last 14 days -
        showing the latest entries first. If you want to add a new 'meeting'
        with a friend, go to "Add". If you want to search for meetings with
        specific friends, go to "Search".
      </div>
      <h2>Last 14 days</h2>
      <EncounterList shownEntries={encountersLast14Days} />
    </>
  )
}
