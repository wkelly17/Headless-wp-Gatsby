import React from "react"
export default function FileField({ register, field, errors }) {
  let id = String(field.id)
  return (
    <>
      <label htmlFor={id}>{field.label}</label>
      <input
        type="file"
        name={String(id)}
        id={id}
        {...register(id, { required: field.isRequired })}
        // defaultValue={field.defaultValue || ""}
      />
      {errors[id] && <span>This field is required</span>}
    </>
  )
}
