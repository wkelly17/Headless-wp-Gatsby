import React from "react"
export default function TimeField({ register, field, errors }) {
  let id = String(field.id)
  return (
    <>
      <label htmlFor={id}>{field.label}</label>
      <input
        type="text"
        name={String(id)}
        id={id}
        placeholder={field.placeholder || ""}
        {...register(id, { required: field.isRequired })}
        // defaultValue={field.defaultValue || ""}
      />
      {errors[id] && <span>This field is required</span>}
    </>
  )
}
