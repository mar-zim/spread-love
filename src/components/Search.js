import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useAutocompleteOptions from '../services/useAutocompleteOptions'

export default function Search({ setSearchTerm, searchTerm, encounters }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const autocompleteOptions = useAutocompleteOptions(encounters)
  const matchArray = findMatches(searchTerm, autocompleteOptions)

  function findMatches(wordToMatch, names) {
    return names.filter((name) => {
      const regex = new RegExp(wordToMatch, 'gi')
      return name.match(regex)
    })
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value)
  }

  function selectName(name) {
    setSearchTerm(name)
    setShowDropdown(false)
  }

  function clearSearch() {
    setShowDropdown(false)
    setSearchTerm('')
  }

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
