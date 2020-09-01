import React from 'react'

export default function Search({ setSearchTerm, searchTerm }) {
  function handleSearch(event) {
    setSearchTerm(event.target.value)
  }

  return (
    <form>
      <input
        type="text"
        placeholder="Search for friends you met"
        value={searchTerm}
        onChange={handleSearch}
      />
    </form>
  )
}
