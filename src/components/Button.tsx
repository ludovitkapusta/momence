import React from 'react'

import styled, { css } from 'styled-components'

interface Props {
  children: JSX.Element | string
  className?: string
  disabled?: boolean
  onClick?: () => void
  type: 'submit' | 'button'
}

const Button = ({ children, className, disabled, onClick, type }: Props) => (
  <StyledButton disabled={disabled} onClick={onClick} type={type} className={className}>
    {children}
  </StyledButton>
)

export default Button

export const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.main};
  border: 2px solid ${(props) => props.theme.colors.main};
  border-radius: ${(props) => props.theme.borderRadius};
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.white};
  height: 36px;
  font-size: 1rem;
  margin-bottom: 16px;

  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.main}cc;
  }

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${(props) => props.theme.colors.buttonDisabledBackgroundColor}33;
      background-image: none;
      border-color: ${(props) => props.theme.colors.buttonDisabledBackgroundColor}33;

      :hover {
        cursor: not-allowed;
        background-color: ${(props) => props.theme.colors.buttonDisabledBackgroundColor}33;
      }
    `}
`
