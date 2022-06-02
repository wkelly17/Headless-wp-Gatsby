import React from "react"
export default function NameField({ register, field, errors }) {
  let id = String(field.id)
  console.log(field)

  let applicableFields = field.inputs.filter((input) => {
    return !input.isHidden
  })
  return (
    <>
      <p>{field.label}</p>
      {applicableFields.map((input) => {
        return (
          <div key={input.id}>
            <label className="inline-block" htmlFor={input.id}>
              {input.label}
            </label>
            <input
              type="text"
              id={input.id}
              {...register(`${input.id}.${input.key}`)}
              placeholder={input.placeholder}
            />
          </div>
        )
      })}
      {errors[id] && <span>This field is required</span>}
    </>
  )
}
