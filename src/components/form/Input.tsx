import React from 'react'
import { ErrorMessage, Field, FieldProps, FormikErrors, FormikValues } from 'formik'

import { StyledFormItemWrapper, StyledInput, StyledLabel } from './Styles'

interface InputProps {
  name: string
  label: string
  type: 'text' | 'number'
  required?: boolean
  errors: FormikErrors<FormikValues>
}

const Input = ({ name, label, type, required = false }: InputProps) => {
  return (
    <StyledFormItemWrapper>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <Field id={name} name={name} required={required}>
        {({ field }: FieldProps) => (
          <>
            <StyledInput {...field} type={type} />
            <ErrorMessage name={name} />
          </>
        )}
      </Field>
    </StyledFormItemWrapper>
  )
}

export default Input
