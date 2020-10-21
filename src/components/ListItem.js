import React from 'react'
import { HorizontalLine } from './HorizontalLine'
import styled from 'styled-components'
import { deleteFromLocal } from '../services/LocalStorage'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded'

export default function ListItem({
  encounter,
  setEncounters,
  showEditButtons,
}) {
  return (
    <ListItemGrid>
      <h4>Date: {encounter.date}</h4>
      {showEditButtons && (
        <StyledDeleteIcon
          onClick={() =>
            deleteFromLocal('encounterList', encounter.entryId, setEncounters)
          }
        />
      )}
      <h5>People:</h5>
      <ul>
        {encounter.friends.map((friend) => (
          <li key={friend.name}>{friend.name}</li>
        ))}
      </ul>
      <h5>Location: </h5>
      <div>{encounter.location}</div>
      <StyledLine />
    </ListItemGrid>
  )
}

const StyledDeleteIcon = styled(DeleteOutlineRoundedIcon)`
  margin-top: 10px;
  color: var(--orange);
  cursor: pointer;
  grid-column: 3;
`

const ListItemGrid = styled.section`
  display: grid;
  grid-template-columns: 3fr 9fr 1fr;
  grid-template-rows: auto;

  h4 {
    grid-column: 1 / span 2;
  }
  h5 {
    grid-column: 1 / span 1;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    grid-column: 2 / span 2;
  }
`

const StyledLine = styled(HorizontalLine)`
  grid-column: 1 / span 3;
`
