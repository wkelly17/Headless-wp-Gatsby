import React, { useRef, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import TextField from "./formFields/TextField"
import { graphql } from "gatsby"
import {
  assignFields,
  shapeFieldsToGfSchema,
  reshapeDataForSubmit,
} from "../../utilities/gravity-forms"
import { useSubmitGravityForm } from "../../api/queries"
import { formBounce } from "../../animations/interactions"

export default function GravityForm({
  form,
  formClassName = "",
  confirmationFunction,
  footerClassName = "",
}) {
  // console.log(props)
  let fields = form.formFields.nodes
  let formId = form.databaseId
  const mutation = useSubmitGravityForm({ id: formId, fieldValues: [] })
  let [bounceTl, setBounceTl] = useState()

  React.useEffect(() => {
    let tl = formBounce(
      document.querySelector('.hub-newsletter-form input[type="submit"')
    )

    setBounceTl(tl)
  }, [])

  let fieldTypeMap = fields.map((field) => {
    return shapeFieldsToGfSchema(field)
  })
  // console.log({ formId })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
  } = useForm()

  // https://github.com/harness-software/wp-graphql-gravity-forms/blob/develop/docs/submitting-forms.md
  async function onSubmit(data) {
    console.log({ data })

    let result = Object.entries(data)
    let formVals = result.map((input, idx) => {
      return reshapeDataForSubmit(input, idx, fieldTypeMap)
    })

    let response = await mutation.mutateAsync({
      id: formId,
      fieldValues: formVals,
    })

    console.log(response)
    if (!response.submitGfForm.errors) {
      if (confirmationFunction) {
        confirmationFunction(reset)
      }
    } else {
      // todo: a default confirmation message fade in above the submit btn;
    }
  }
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`gform ${formClassName}`}
      id={`gform-${formId}`}
    >
      <div className="formInnerWrapper dmax:h-24">
        {/* register your input into the hook by invoking the "register" function */}

        {fields.length &&
          fields.map((formField) => {
            let Component = assignFields(formField.type)

            if (Component && Component.name == "SelectField") {
              let isMultiSelect = formField.type === "MULTISELECT"

              return (
                <>
                  <Controller
                    name={String(formField.id)}
                    control={control}
                    rules={{ required: formField.isRequired }}
                    render={({ field }) => {
                      //
                      return (
                        <Component
                          {...field}
                          formField={formField}
                          errors={errors}
                          isMultiSelect={isMultiSelect}
                        />
                      )
                    }}
                  />
                </>
              )
            } else if (Component) {
              return (
                <div className="formInputWrapper" key={formField.id}>
                  <Component
                    register={register}
                    field={formField}
                    errors={errors}
                    addlState={{ bounceTl }}
                  />
                </div>
              )
            }
          })}
      </div>
      <div className={`formFooter ${footerClassName}`}>
        <input type="submit" className="dmax:h-full" />
      </div>
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
        ... on WpMultiSelectField {
          id
          description
          isRequired
          label
          value
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
