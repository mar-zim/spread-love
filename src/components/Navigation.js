import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export default function Navigation() {
  return (
    <StyledNavigation>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/addentry">Add</NavLink>
      <NavLink to="/search">Search</NavLink>
    </StyledNavigation>
  )
}

const StyledNavigation = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 56px;
`
