import { gsap } from "gsap"

export function NewsletterSuccessFxn(
  hookFormReset,
  confirmationMessage,
  wpGfForm
) {
  let form = document.querySelector(`#gform-${wpGfForm.databaseId}`)
  let input = form.querySelector('input[type="email"]')
  input.value = confirmationMessage
  gsap.to(input)
  setTimeout(() => {
    input.value = ""
    hookFormReset()
  }, 1500)
}
