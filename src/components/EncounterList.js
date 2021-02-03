import React, { useState } from 'react'
import ListItem from './ListItem'
import styled from 'styled-components'

export default function EncounterList({ shownEntries, setEncounters }) {
  const [showEditButtons, setShowEditButtons] = useState(false)

  function toggleEditButtons() {
    setShowEditButtons(!showEditButtons)
  }

  return (
    <>
      {showEditButtons ? (
        <StyledLink onClick={toggleEditButtons}>Done editing</StyledLink>
      ) : (
        shownEntries.length > 0 && (
          <StyledLink onClick={toggleEditButtons}>Edit list</StyledLink>
        )
      )}
      {shownEntries.length > 0 ? (
        shownEntries.map((entry) => (
          <ListItem
            encounter={entry}
            key={entry.entryId}
            setEncounters={setEncounters}
            showEditButtons={showEditButtons}
          />
        ))
      ) : (
        <div>No entries</div>
      )}
    </>
  )
}

const StyledLink = styled.div`
  margin-top: 5px;
  color: var(--orange);
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`
