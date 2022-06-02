import React from "react"
export default function NumberField({ register, field, errors }) {
  let id = String(field.id)
  return (
    <>
      <label htmlFor={id}>{field.label}</label>
      <input
        type="number"
        id={id}
        placeholder={field.placeholder || ""}
        defaultValue={field.defaultValue || null}
        {...register(id, {
          required: field.isRequired,
          max: field.rangeMax || null,
          min: field.rangeMin || null,
        })}
        // defaultValue={field.defaultValue || ""}
      />
      {errors[id] && <span>This field is required</span>}
    </>
  )
}
