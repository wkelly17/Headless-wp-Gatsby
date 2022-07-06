import React from "react"
import Select from "react-select" //can destructure out components to write custom components if desired

// export default function SelectField({ register, field, errors }) {
//   let id = String(field.id)
//
//   return (
//     <>
//       <label htmlFor={id}>{field.label}</label>
//       <select id={id} {...register(id, { required: field.isRequired })}>
//         {field.choices?.map((choice) => {
//           return (
//             <option key={choice.value} value={choice.value}>
//               {choice.text}
//             </option>
//           )
//         })}
//       </select>
//       <Select options={field.choices} />
//       {errors[id] && <span>This field is required</span>}
//     </>
//   )
// }

export default function SelectField({
  formField,
  errors,
  isMultiSelect,
  ...restProps
}) {
  let {
    choices,
    // defaultValue,
    // description,
    id,
    // isRequired,
    label,
    // placeholder,
    // value,
  } = formField

  let options = choices.map((choice) => {
    return { value: choice.value, label: choice.text }
  })

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <Select
        {...restProps}
        options={options}
        className="react-select-container"
        classNamePrefix="react-select"
        // styles={customStyles}
        inputId={id}
        isClearable={true}
        isMulti={isMultiSelect}
        isSearchable={true}
        // placeholder={"placeholder!"}
        // components={{ Option, MenuList }}
      />
      {errors[id] && <span>This field is required</span>}
    </>
  )
}

// let colors = [
//   "hsla(0, 50%, 50%, .5)",
//   "hsla(40, 50%, 50%, .5)",
//   "hsla(80, 50%, 50%, .5)",
//   "hsla(120, 50%, 50%, .5)",
//   "hsla(160, 50%, 50%, .5)",
//   "hsla(200, 50%, 50%, .5)",
//   "hsla(240, 50%, 50%, .5)",
//   "hsla(280, 50%, 50%, .5)",
//   "hsla(320, 50%, 50%, .5)",
// ]

// E.G. Custom styles in React Select
/* const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: `1px dotted ${colors[0]}`,
    color: state.isSelected ? "red" : "blue",
    padding: 20,
  }),
  control: (provided, state) => {
    // none of react-select's styles are passed to <Control />
    let isFocused = state.isFocused

    return {
      ...provided,
      // background: `${isFocused ? "red" : "purple"}`,
    }
  },
  singleValue: (provided, state) => {
    // const opacity = state.hasValue ? 0.5 : 1
    // const transition = "opacity 300ms"

    return {
      ...provided,
      border: "solid red 1px",
    }
  },
  clearIndicator: (provided, state) => {
    // const opacity = state.hasValue ? 0.5 : 1
    // const transition = "opacity 300ms"

    return {
      ...provided,
      border: "solid blue 1px",
    }
  },
} */

// const Control = ({ children, ...props }) => {
//   return (
//     <components.Control {...props}>
//       <span className="px-8 bg-red-400">Hi</span>
//       {children}
//     </components.Control>
//   )
// }
// const Option = ({ children, ...props }) => {
//   //
//   const { isDisabled, isFocused, isSelected } = props

//   return (
//     <components.Option {...props}>
//       <div
//         className={`w-full p-0 ${isFocused && "bg-primary text-white"} ${
//           isSelected && "bg-secondary text-black"
//         }`}
//       >
//         {children}
//       </div>
//     </components.Option>
//   )
// }
// const MenuList = ({ children, ...props }) => {
//   //
//   const { isDisabled, isFocused, isSelected } = props

//   return (
//     <components.MenuList {...props}>
//       <div className={"bg-gray-200 p-0"}>{children}</div>
//     </components.MenuList>
//   )
// }
