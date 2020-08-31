import React from 'react'

export default function ListItem({ encounter }) {
  const day = encounter.date.getDate()
  const month = encounter.date.getMonth()
  const year = encounter.date.getFullYear()

  return (
    <>
      <h4>
        Date: {month}/{day}/{year}
      </h4>
      <div>People: {encounter.names}</div>
      <div>Location: {encounter.location}</div>
    </>
  )
}
