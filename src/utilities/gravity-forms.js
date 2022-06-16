import { GraphQLClient, gql } from "graphql-request"
import { useQuery } from "react-query"
import {
  TextField,
  Checkbox,
  TextAreaField,
  EmailField,
  NameField,
  AddressField,
  SelectField,
  NumberField,
  RadioField,
  TimeField,
  PhoneField,
  WebsiteField,
} from "../components/gravityForms/formFields"

export function assignFields(type) {
  switch (type) {
    case "TEXT":
      return TextField
    case "CHECKBOX":
      return Checkbox
    case "TEXTAREA":
      return TextAreaField
    case "EMAIL":
      return EmailField
    case "NAME":
      return NameField
    case "ADDRESS":
      return AddressField
    case "SELECT":
      return SelectField
    case "MULTISELECT":
      return SelectField
    case "NUMBER":
      return NumberField
    case "RADIO":
      return RadioField
    case "TIME":
      return TimeField
    case "PHONE":
      return PhoneField
    case "WEBSITE":
      return WebsiteField

    default:
      console.log("not supported yet", type)
      return undefined
      break
  }
}

export function shapeFieldsToGfSchema(field) {
  console.log(field)
  switch (field.type) {
    case "ADDRESS":
      return {
        id: field.id,
        addressValues: field.inputs
          ? field.inputs
              .filter((inp) => !inp.isHidden)
              .map((input) => {
                return input.key
              })
          : null,
        type: field.type,
      }
    case "CHECKBOX":
      return {
        id: field.id,
        checkboxValues: field.inputs.map((input) => {
          return input.id
        }),
        type: field.type,
      }
    case "EMAIL":
      return {
        id: field.id,
        emailValues: field.inputs
          ? field.inputs.map((input) => {
              return input.id
            })
          : null,
        type: field.type,
      }
    case "NAME":
      return {
        id: field.id,
        nameValues: field.inputs
          ? field.inputs
              .filter((inp) => !inp.isHidden)
              .map((input) => {
                return input.key
              })
          : null,
        type: field.type,
      }
    case "MULTISELECT":
      return {
        id: field.id,
        values: [],
        type: field.type,
      }

    default:
      return {
        id: field.id,
        type: field.type,
      }
  }
}

export function reshapeDataForSubmit(input, idx, fieldTypeMap) {
  let [id, vals] = input
  if (Array.isArray(vals)) {
    vals = vals.filter((val) => val != undefined)
  }
  let correspondingType = fieldTypeMap.find((obj) => obj.id == id)
  let reshaped = {}

  switch (correspondingType.type) {
    case "ADDRESS":
      let addObj = {}
      vals.forEach((val, idx) => {
        let key = correspondingType.addressValues[idx]
        addObj[key] = val[key]
      })
      reshaped = {
        id: Number(id),
        addressValues: addObj,
      }
      break

    case "CHECKBOX":
      reshaped = {
        id: Number(id),
        checkboxValues: vals.map((val, idx) => {
          let value = val ? "true" : "false"
          return {
            inputId: correspondingType.checkboxValues[idx],
            value: value,
          }
        }),
      }
      break
    case "EMAIL":
      reshaped = {
        id: Number(id),
        emailValues: {
          value: vals,
        },
      }

      break
    case "NAME":
      let namesObj = {}
      vals.forEach((val, idx) => {
        let key = correspondingType.nameValues[idx]
        namesObj[key] = val[key]
      })
      reshaped = {
        id: Number(id),
        nameValues: namesObj,
      }
      break

    case "SELECT":
      reshaped = {
        id: Number(id),
        value: vals.value,
      }
      break

    case "MULTISELECT":
      reshaped = {
        id: Number(id),
        values: vals.map((value) => {
          return value.value
        }),
      }
      break

    default:
      reshaped = {
        id: Number(id),
        value: vals,
      }
      break
  }
  return reshaped
}
