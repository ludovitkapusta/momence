import React from 'react'
import { ErrorMessage, Field, FieldProps, FormikErrors, FormikValues } from 'formik'

import { StyledFormItemWrapper, StyledLabel, StyledSelect } from './Styles'

interface SelectProps {
  name: string
  label: string
  required?: boolean
  options: Array<{
    label: string
    value: string
  }>
}

const Select = ({ name, label, options, required = false }: SelectProps) => {
  return (
    <StyledFormItemWrapper>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <Field id={name} name={name} required={required}>
        {({ field }: FieldProps) => (
          <>
            <StyledSelect {...field} data-testid={`select-${name}`}>
              <option value=""></option>
              {options.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </StyledSelect>
            <ErrorMessage name={name} />
          </>
        )}
      </Field>
    </StyledFormItemWrapper>
  )
}
export default Select
