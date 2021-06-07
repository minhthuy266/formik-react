import React from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import ChakraInput from './ChakraInput'

function FormikContainer() {
  const dropdownOptions = [
    {key: 'Select an option', value: ''},
    {key: 'Option 1', value: 'option1'},
    {key: 'Option 2', value: 'option2'},
    {key: 'Option 3', value: 'option3'},
  ]

  const radioOptions = [
    {key: 'Option 1', value: 'rOption1'},
    {key: 'Option 2', value: 'rOption2'},
    {key: 'Option 3', value: 'rOption3'},
  ]

  const checkboxOptions = [
    {key: 'Option 1', value: 'cOption1'},
    {key: 'Option 2', value: 'cOption2'},
    {key: 'Option 3', value: 'cOption3'},
  ]

  const initialValues = {
    email: '',
    description: '',
    selectOptions: '',
    radioOptions: '',
    checkboxOptions: [],
    birthDate: null,
  }
  const validationSchema = Yup.object({
    email: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    selectOptions: Yup.string().required('Required'),
    radioOptions: Yup.string().required('Required'),
    checkboxOptions: Yup.array().required('Required'),
    birthDate: Yup.date().required('Required').nullable(),
  })

  const onSubmit = (values) => {
    console.log('Form data', values)
    console.log('Saved data', JSON.parse(JSON.stringify(values)))
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {(formik) => (
          <Form>
            <FormikControl
              control='input'
              type='email'
              label='Email'
              name='email'
            />

            <FormikControl
              control='textarea'
              type='text'
              label='Description'
              name='description'
            />

            <FormikControl
              control='select'
              options={dropdownOptions}
              label='Select a topic'
              name='selectOptions'
            />

            <FormikControl
              control='radio'
              options={radioOptions}
              label='Radio topic'
              name='radioOptions'
            />

            <FormikControl
              control='checkbox'
              options={checkboxOptions}
              label='Checkbox topics'
              name='checkboxOptions'
            />

            <FormikControl
              control='date'
              options={checkboxOptions}
              label='Pick a date'
              name='birthDate'
            />

            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormikContainer
