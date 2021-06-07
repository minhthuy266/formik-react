import React from 'react'
import {Field} from 'formik'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/react'

function ChakraInput(props) {
  const {label, name, ...rest} = props
  return (
    <Field name={name}>
      {({field, form}) => {
        return (
          <FormControl
            id='name'
            isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input id='name' {...rest} {...field} />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        )
      }}
    </Field>
  )
}

export default ChakraInput
