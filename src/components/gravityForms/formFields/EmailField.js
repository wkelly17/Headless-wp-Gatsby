import React from "react"
export default function EmailField({ register, field, errors }) {
  let id = String(field.id)
  // todo: handle conditional render if requires confirmation
  return (
    <>
      <label htmlFor={id}>{field.label}</label>
      <input
        type="email"
        id={id}
        placeholder={field.placeholder || ""}
        defaultValue={field.defaultValue || null}
        {...register(id, { required: true })}
        // defaultValue={field.defaultValue || ""}
      />
      {errors[id] && <span>This field is required</span>}
    </>
  )
}
