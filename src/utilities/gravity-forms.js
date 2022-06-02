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
