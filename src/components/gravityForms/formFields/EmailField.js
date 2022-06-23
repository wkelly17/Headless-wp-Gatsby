import React from "react"
export default function EmailField({
  register,
  field,
  errors,
  addlState,
  ...restProps
}) {
  let id = String(field.id)
  // todo: handle conditional render if requires confirmation
  let registrationProps = {
    required: true,
  }
  if (addlState.bounceTl) {
    registrationProps.onBlur = () => addlState.bounceTl?.pause()
  }

  return (
    <>
      <label htmlFor={id}>{field.label}</label>
      <input
        type="email"
        id={id}
        onFocus={() => {
          addlState.bounceTl?.play()
        }}
        placeholder={field.placeholder || ""}
        defaultValue={field.defaultValue || null}
        {...register(id, { ...registrationProps })}
        // defaultValue={field.defaultValue || ""}
      />
      {errors[id] && <span>This field is required</span>}
    </>
  )
}
