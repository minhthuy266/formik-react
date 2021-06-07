import React, {useState} from 'react'
import {Formik, Form, Field, ErrorMessage, FieldArray, FastField} from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
  name: '',
  email: '',
  channel: '',
  comment: '',
  address: '',
  social: {
    facebook: '',
    twitter: '',
  },

  phoneNumbers: ['', ''],
  phNumbers: [''],
}

const savedValues = {
  name: 'Thuy',
  email: 'example@gmail.com',
  channel: 'ABC',
  comment:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, dolores impedit sunt, sapiente optio blanditiis perferendis modi placeat nesciunt nemo eius possimus cumque, vel corrupti harum corporis laborum. Nemo, accusamus!',
  address: '266',
  social: {
    facebook: '',
    twitter: '',
  },

  phoneNumbers: ['', ''],
  phNumbers: [''],
}

const onSubmit = (values, onSubmitProps) => {
  console.log('Form data', values)
  onSubmitProps.setSubmitting(false)
  onSubmitProps.resetForm()
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  channel: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
})

const validateCommnents = (value) => {
  let error
  if (!value) {
    error = 'Required'
  }
  return error
}

function YoutubeForm() {
  const [formValues, setFormValues] = useState(null)
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      // validateOnMount
    >
      {(formik) => {
        console.log('Formik', formik)
        return (
          <Form>
            <div className='form-control'>
              <label htmlFor='name'>Name</label>
              <Field type='text' id='name' name='name' />
              <ErrorMessage name='name' component={TextError} />
            </div>

            <div className='form-control'>
              <label htmlFor='email'>E-mail</label>
              <Field type='email' id='email' name='email' />
              <ErrorMessage name='email'>
                {(errorMsg) => <div className='errors'>{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div className='form-control'>
              <label htmlFor='address'>Address</label>
              <FastField id='address' name='address'>
                {(props) => {
                  console.log('THUY XINH DEP')
                  const {field, form, meta} = props
                  // console.log('Props', props)
                  return (
                    <div>
                      <input type='text' id='address' {...field} />
                      {meta.touched && meta.error ? (
                        <div className='errors'>{meta.error}</div>
                      ) : null}
                    </div>
                  )
                }}
              </FastField>
            </div>

            <div className='form-control'>
              <label htmlFor='channel'>Channel</label>
              <Field type='text' id='channel' name='channel' />
              <ErrorMessage name='channel' component={TextError} />
            </div>

            <div className='form-control'>
              <label htmlFor='comment'>Comment</label>
              <Field
                as='textarea'
                id='comment'
                name='comment'
                validate={validateCommnents}
              />
              <ErrorMessage name='comment' component={TextError} />
            </div>

            <div className='form-control'>
              <label htmlFor='facebook'>Facebook Profile</label>
              <Field type='text' id='facebook' name='social.facebook' />
              <ErrorMessage name='social.facebook' component={TextError} />
            </div>

            <div className='form-control'>
              <label htmlFor='twitter'>Twitter Profile</label>
              <Field type='text' id='twitter' name='social.twitter' />
              <ErrorMessage name='social.twitter' component={TextError} />
            </div>

            <div className='form-control'>
              <label htmlFor='primaryPh'>Primary phone number</label>
              <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
            </div>

            <div className='form-control'>
              <label htmlFor='secondaryPh'>Secondary phone number</label>
              <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
            </div>

            <div className='form-control'>
              <label htmlFor='phNumbers'>List of phone number</label>
              <FieldArray name='phNumbers'>
                {(fieldArrayProps) => {
                  // console.log('Field Array', fieldArrayProps)
                  const {push, remove, form} = fieldArrayProps
                  const {values} = form
                  const {phNumbers} = values
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div>
                          <Field name={`phNumbers[${index}]`} />

                          {index > 0 && (
                            <button type='button' onClick={() => remove(index)}>
                              -
                            </button>
                          )}

                          <button type='button' onClick={() => push('')}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  )
                }}
              </FieldArray>
            </div>

            {/* <button
              type='button'
              onClick={() => formik.validateField('comment')}>
              Validate Comments
            </button>
            <button type='button' onClick={() => formik.validateForm()}>
              Validate All
            </button>

            <button
              type='button'
              onClick={() => formik.setFieldTouched('comment')}>
              Visit Comments
            </button>
            <button
              type='button'
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comment: true,
                })
              }>
              Visit All
            </button> */}

            <button type='button' onClick={() => setFormValues(savedValues)}>
              Load saved data
            </button>

            <button type='reset'>Reset</button>

            <button
              type='submit'
              disabled={!formik.isValid || formik.isSubmitting}>
              Submit
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default YoutubeForm
