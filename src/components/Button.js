import React from 'react'
import styled from 'styled-components'

export default function Button({ onClick, text, type }) {
  return (
    <StyledButton onClick={onClick} type={type}>
      {text}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  margin: 0;
  padding: 5px;
  border-radius: 10px;
  border: 0;
  max-width: 60%;
  background-color: var(--darkblue);
  text-align: center;
  color: var(--white);
  cursor: pointer;
  font-size: 14px;
  &:active {
    position: relative;
    top: 2px;
  }
`
