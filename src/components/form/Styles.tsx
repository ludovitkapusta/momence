import styled from 'styled-components'

export const StyledFormItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`

export const StyledLabel = styled.label`
  color: ${(props) => props.theme.colors.main};
  font-size: 1rem;
  margin-bottom: 3px;
`

export const StyledSelect = styled.select`
  border: 2px solid ${(props) => props.theme.colors.main};
  border-radius: ${(props) => props.theme.borderRadius};
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.main};
  height: 36px;
  font-size: 1rem;
  padding: 0 7px;
`

export const StyledInput = styled.input`
  border: 2px solid ${(props) => props.theme.colors.main};
  border-radius: ${(props) => props.theme.borderRadius};
  box-sizing: border-box;
  color: ${(props) => props.theme.colors.main};
  height: 36px;
  font-size: 1rem;
  padding: 0 7px;
`
