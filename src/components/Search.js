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

  function clearSearch() {
    setShowDropdown(false)
    setSearchTerm('')
  }
  const matchArray = findMatches(searchTerm, autocompleteOptions)

  return (
    <StyledSearchbox>
      <input
        type="text"
        placeholder="Search for entries by friend's name"
        value={searchTerm}
        onChange={handleSearch}
        onClick={() => setShowDropdown(!showDropdown)}
      />
      <StyledClearSearch onClick={clearSearch}>x</StyledClearSearch>
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
    </StyledSearchbox>
  )
}

const StyledSearchbox = styled.div`
  position: relative;
`

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

const StyledClearSearch = styled.div`
  position: absolute;
  right: 15%;
  top: 0;
  font-size: 18px;
  color: var(--orange);
  cursor: pointer;
`
