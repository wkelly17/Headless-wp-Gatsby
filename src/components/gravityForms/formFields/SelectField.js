import React from "react"
export default function SelectField({ register, field, errors }) {
  let id = String(field.id)
  return (
    <>
      <label htmlFor={id}>{field.label}</label>
      <select id={id} {...register(id, { required: field.isRequired })}>
        {field.choices?.map((choice) => {
          return (
            <option key={choice.value} value={choice.value}>
              {choice.text}
            </option>
          )
        })}
      </select>
      {errors[id] && <span>This field is required</span>}
    </>
  )
}
