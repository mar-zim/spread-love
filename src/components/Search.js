import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Search({ setSearchTerm, searchTerm, encounters }) {
  const [autocompleteOptions, setAutocompleteOptions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  function handleSearch(event) {
    setSearchTerm(event.target.value)
  }

  //function to hide the autocomplete options and take the selected name as search parameter, when a name is selcted from the autocomplete list
  function selectName(name) {
    setSearchTerm(name)
    setShowDropdown(false)
  }

  //when the component mounts, an array is created that contains all the entered names as unique values. this array is used for the dropdown of the autocomplete options
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
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown && (
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
