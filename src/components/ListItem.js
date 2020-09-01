import React from 'react'

export default function ListItem({ encounter }) {
  return (
    <>
      <h4>Date: {encounter.date}</h4>
      <div>People:</div>
      <ul>
        {encounter.friends.map((friend) => (
          <li key={friend.firstName + friend.lastName}>
            {friend.firstName} {friend.lastName}
          </li>
        ))}
      </ul>
      <div>Location: {encounter.location}</div>
    </>
  )
}
