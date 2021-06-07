import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {Field, ErrorMessage} from 'formik'
import TextError from './TextError'

function DatePickerComponent(props) {
  const {label, name, ...rest} = props
  return (
    <div className='form-control'>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest}>
        {({form, field}) => {
          const {setFieldValue} = form
          const {value} = field
          return (
            <DatePicker
              id={name}
              {...rest}
              {...field}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
            />
          )
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  )
}

export default DatePickerComponent
