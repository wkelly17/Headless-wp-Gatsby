import React from "react"
export default function RadioField({ register, field, errors }) {
  let id = String(field.id)
  let choices = field.choices
  return (
    <>
      {choices.map((choice, idx) => {
        return (
          <div key={choice.value}>
            <label htmlFor={`${field.id}_${idx}`}>{choice.text}</label>
            <input
              type="radio"
              name={String(id)}
              id={`${field.id}_${idx}`}
              {...register(id, { required: field.isRequired })}
              value={choice.value}

              // defaultValue={field.defaultValue || ""}
            />
          </div>
        )
      })}
      {errors[id] && <span>This field is required</span>}
    </>
  )
}
