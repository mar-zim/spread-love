import React from 'react'
import Home from './pages/Home'
import styled from 'styled-components'

export default function App() {
  return (
    <StyledMain>
      <Home />
    </StyledMain>
  )
}

const StyledMain = styled.main`
  padding: 0 5%;
  overflow-y: scroll;
`
