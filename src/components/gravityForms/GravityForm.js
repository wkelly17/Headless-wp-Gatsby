import React from "react"
import { useForm } from "react-hook-form"
import TextField from "./formFields/TextField"
import { graphql } from "gatsby"
import { assignFields } from "../../utilities/gravity-forms"
import { useSubmitGravityForm } from "../../api/queries"

export default function GravityForm(props) {
  // console.log(props)
  let fields = props.data?.formFields.nodes
  let formId = props.data?.databaseId
  const mutation = useSubmitGravityForm({ id: formId, fieldValues: [] })
  // debugger

  // todo: link a map to data via ID's;
  let fieldTypeMap = fields.map((field) => {
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

      default:
        return {
          id: field.id,
          type: field.type,
        }
    }
  })
  // console.log({ formId })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // https://github.com/harness-software/wp-graphql-gravity-forms/blob/develop/docs/submitting-forms.md
  async function onSubmit(data) {
    console.log({ data })

    let result = Object.entries(data)
    let formVals = result.map((input, idx) => {
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

        default:
          reshaped = {
            id: Number(id),
            value: vals,
          }
          break
      }
      return reshaped
    })
    debugger
    let response = await mutation.mutateAsync({
      id: formId,
      fieldValues: formVals,
    })
    debugger
    console.log(response)

    // submitGfForm(
    // 	input: {id: "2", fieldValues: {id: 1, value: "Testing Graphiql Submission"}}
    // )

    // id: 5
    // checkboxValues: [
    // 	{ inputId: 5.1, value: "This checkbox field is selected" }
    // 	{ inputId: 5.2, value: "This checkbox field is also selected" }
    // ]
    // debugger
    // console.log(errors['1'])
  }
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="gform">
      {/* register your input into the hook by invoking the "register" function */}

      {fields.length &&
        fields.map((field) => {
          let Component = assignFields(field.type)
          if (Component) {
            return (
              <div className="py-4 border" key={field.id}>
                <Component register={register} field={field} errors={errors} />
              </div>
            )
          }
        })}
      <input type="submit" />
    </form>
  )
}

export const query = graphql`
  fragment gravityFormFragment on WpGfForm {
    formFields {
      nodes {
        type
        ... on WpAddressField {
          id
          isRequired
          label
          value
          inputs {
            key
            label
            name
            placeholder
            id
            isHidden
            customLabel
            defaultValue
          }
          addressType
          inputName
        }
        ... on WpTextField {
          id
          description
          isRequired
          label
          placeholder
        }
        ... on WpCheckboxField {
          id
          isRequired
          label
          choices {
            text
            value
            isSelected
          }
          inputs {
            id
            label
            name
          }
        }
        ... on WpEmailField {
          id
          label
          description
          isRequired
          placeholder
          hasEmailConfirmation
          inputs {
            defaultValue
            id
            label
            name
            placeholder
          }
        }
        ... on WpNameField {
          id
          label
          description
          cssClass
          inputs {
            key
            label
            placeholder
            choices {
              text
              value
            }
            isHidden
            id
          }
        }
        ... on WpTextAreaField {
          id
          defaultValue
          description
          isRequired
          label
          placeholder
        }
        ... on WpSelectField {
          id
          defaultValue
          description
          isRequired
          label
          value
          placeholder
          choices {
            isSelected
            text
            value
          }
        }
        ... on WpNumberField {
          id
          defaultValue
          description
          isRequired
          label
          numberFormat
          rangeMax
          rangeMin
          placeholder
        }
        ... on WpRadioField {
          id
          description
          choices {
            isSelected
            isOtherChoice
            text
            value
          }
          isRequired
          label
        }
        ... on WpDateField {
          id
          defaultValue
          description
          inputs {
            label
            placeholder
            id
            defaultValue
            customLabel
          }
          isRequired
          label
          placeholder
        }
        ... on WpTimeField {
          id
          description
          inputs {
            id
            label
            placeholder
            defaultValue
          }
          isRequired
          label
        }
        ... on WpWebsiteField {
          id
          label
          isRequired
          visibility
          placeholder
          defaultValue
          description
        }
        ... on WpPhoneField {
          id
          defaultValue
          isRequired
          label
          value
          phoneFormat
          placeholder
        }
      }
    }
  }
`
