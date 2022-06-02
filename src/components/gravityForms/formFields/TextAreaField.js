import React from "react"
export default function TextAreaField({ register, field, errors }) {
  let id = String(field.id)
  console.log({ field })
  return (
    <>
      <label htmlFor={id}>{field.label}</label>
      <textarea
        {...register(id, { required: field.isRequired })}
        id={id}
        cols="30"
        rows="10"
        className="border-2 border-red-400"
        placeholder={field.placeholder || ""}
        defaultValue={field.defaultValue || null}
      ></textarea>
      {errors[id] && <span>This field is required</span>}
    </>
  )
}
