import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Search({
  setSearchTerm,
  searchTerm,
  setDisplay,
  display,
  encounters,
}) {
  const [autocompleteOptions, setAutocompleteOptions] = useState([])

  function handleSearch(event) {
    setSearchTerm(event.target.value)
  }

  function selectName(name) {
    setSearchTerm(name)
    setDisplay(false)
  }

  useEffect(() => {
    let friendNameArray = []
    encounters.forEach((encounter) =>
      encounter.friends.forEach(
        (friend) =>
          (friendNameArray = [...friendNameArray, friend.name.toLowerCase()])
      )
    )
    const uniqueNames = [...new Set(friendNameArray)]
    setAutocompleteOptions(uniqueNames)
  }, [])

  return (
    <div>
      <input
        type="text"
        placeholder="Search for entries by friend's name"
        value={searchTerm}
        onChange={handleSearch}
        onClick={() => setDisplay(!display)}
      />
      {display && (
        <StyledAutoCompleteDropdown>
          {autocompleteOptions
            .filter((option) => option.indexOf(searchTerm.toLowerCase()) > -1)
            .map((value, index) => {
              return (
                <div onClick={() => selectName(value)} key={index}>
                  <span>{value}</span>
                </div>
              )
            })}
        </StyledAutoCompleteDropdown>
      )}
    </div>
  )
}

const StyledAutoCompleteDropdown = styled.div`
  z-index: 1000;
  position: absolute;
  min-width: 40%;
  border: 1px solid var(--grey-1);
  div {
    padding: 2px;
    background-color: #ffffff;
  }
`
