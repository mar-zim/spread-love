import React from 'react'
import { HorizontalLine } from './HorizontalLine'
import styled from 'styled-components'

export default function ListItem({ encounter }) {
  return (
    <ListItemGrid>
      <h4>Date: {encounter.date}</h4>
      <div>People:</div>
      <ul>
        {encounter.friends.map((friend) => (
          <li key={friend.name}>{friend.name}</li>
        ))}
      </ul>
      <div>Location: </div>
      <div>{encounter.location}</div>
      <StyledLine />
    </ListItemGrid>
  )
}

const ListItemGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto;

  h4 {
    grid-column: 1 / span 2;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`

const StyledLine = styled(HorizontalLine)`
  grid-column: 1 / span 2;
`
