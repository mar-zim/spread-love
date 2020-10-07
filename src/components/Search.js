import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Search({ setSearchTerm, searchTerm, encounters }) {
  const [autocompleteOptions, setAutocompleteOptions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  function handleSearch(event) {
    setSearchTerm(event.target.value)
  }

  function selectName(name) {
    setSearchTerm(name)
    setShowDropdown(false)
  }

  useEffect(() => {
    let friendNameArray = []
    encounters.forEach((encounter) =>
      encounter.friends.forEach(
        (friend) => (friendNameArray = [...friendNameArray, friend.name])
      )
    )
    const uniqueNames = [...new Set(friendNameArray)]
    setAutocompleteOptions(uniqueNames)
  }, [])

  function findMatches(wordToMatch, names) {
    return names.filter((name) => {
      const regex = new RegExp(wordToMatch, 'gi')
      return name.match(regex)
    })
  }
  const matchArray = findMatches(searchTerm, autocompleteOptions)

  return (
    <div>
      <input
        type="text"
        placeholder="Search for entries by friend's name"
        value={searchTerm}
        onChange={handleSearch}
        onBlur={() => setShowDropdown(!showDropdown)}
        onKeyDown={() => setShowDropdown(true)}
      />
      {showDropdown && (
        <StyledAutoCompleteDropdown>
          {matchArray.map((value, index) => {
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
  width: 80vw;
  background-color: #ffffff;
  div {
    padding: 2px 0 2px 15px;
    background-color: #ffffff;
    &:hover {
      color: var(--orange);
    }
  }
`
