import React, { useState } from "react"
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
    dateFormat,
    dateType,
    defaultValue,
    id,
    isRequired,
    label,
    placeholder,
  } = formField
  const [startDate, setStartDate] = useState(new Date())

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
