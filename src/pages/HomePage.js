import React from 'react'
import EncounterList from '../components/EncounterList'
import { sortEncountersLast14Days } from '../services/SortEntries'
import styled from 'styled-components'

export default function HomePage({ encounters }) {
  const encountersLast14Days = sortEncountersLast14Days(encounters)

  return (
    <>
      <StyledLogo src={process.env.PUBLIC_URL + '/logo.svg'} alt="logo" />
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

const StyledLogo = styled.img`
  width: 100%;
  margin-top: 10%;
`
