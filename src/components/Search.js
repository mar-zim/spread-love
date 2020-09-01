import React from 'react'

export default function Search({
  setSearchTerm,
  searchTerm,
  setDisplay,
  display,
  options,
}) {
  function handleSearch(event) {
    setSearchTerm(event.target.value)
  }

  const selectName = (name) => {
    setSearchTerm(name)
    setDisplay(false)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter first name to search"
        value={searchTerm}
        onChange={handleSearch}
        onClick={() => setDisplay(!display)}
      />
      {display && (
        <div>
          {options
            .filter((option) => option.indexOf(searchTerm.toLowerCase()) > -1)
            .map((value, index) => {
              return (
                <div onClick={() => selectName(value)} key={index}>
                  <span>{value}</span>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
