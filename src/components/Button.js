import React from 'react'
import styled from 'styled-components'

export default function Button({
  onClick,
  text,
  type,
  backgroundColor,
  color,
}) {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      backgroundColor={backgroundColor}
      color={color}
    >
      {text}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  margin: 0;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid var(--darkblue);
  max-width: 60%;
  background-color: ${(props) => props.backgroundColor || 'var(--darkblue)'};
  text-align: center;
  color: ${(props) => props.color || 'var(--white)'};
  cursor: pointer;
  font-size: 14px;
  &:active {
    position: relative;
    top: 2px;
  }
`
