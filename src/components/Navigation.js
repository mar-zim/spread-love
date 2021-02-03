import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export default function Navigation() {
  return (
    <StyledNavigation>
      <StyledNavLink exact to="/" activeClassName="active">
        Home
      </StyledNavLink>
      <StyledNavLink to="/addentry" activeClassName="active">
        Add
      </StyledNavLink>
      <StyledNavLink to="/search" activeClassName="active">
        Search
      </StyledNavLink>
    </StyledNavigation>
  )
}

const StyledNavigation = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  width: 100%;
  .active {
    background-color: var(--orange);
  }
`

const StyledNavLink = styled(NavLink)`
  margin: 0;
  padding: 2px 10px;
  text-decoration: none;
  cursor: pointer;
  font-size: 18px;
  color: var(--white);
  background-color: var(--darkblue);
  border-radius: 10px;
`
