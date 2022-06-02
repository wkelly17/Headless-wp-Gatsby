import React from "react"
export default function Checkbox({ register, field, errors }) {
  let id = String(field.id)

  // console.log(field.inputs)
  return (
    <>
      {field.inputs.map((input) => {
        return (
          <div key={input.id}>
            <label className="inline-block" htmlFor={input.id}>
              {input.label}
            </label>
            <input
              type="checkbox"
              id={input.id}
              {...register(String(input.id))}
            />
          </div>
        )
      })}
      {errors[id] && <span>This field is required</span>}
    </>
  )
}
