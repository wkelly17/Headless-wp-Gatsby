import React from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

export default function DateField({
  formField,
  errors,
  onChange,
  value,
  ...restProps
}) {
  // debugger
  let {
    // dateFormat,
    // dateType,
    // defaultValue,
    id,
    label,
    // placeholder,
  } = formField

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <DatePicker
        {...restProps}
        selected={value}
        onChange={(date) => onChange(date)}
        inline
      />

      {errors[id] && <span>This field is required</span>}
    </>
  )
}
