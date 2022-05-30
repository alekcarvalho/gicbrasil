import { reactive } from '@vue/reactivity'
import useValidators from '~/utils/form/validators'

export default function useFormValidation() {
  const errors = reactive({})
  errors.form = []

  const removeElement = (item) => {
    const arr = errors.form
    const index = errors.form.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }

  const { isEmpty, minLength, isEmail, isNum } = useValidators()

  const validateEmptyField = (fieldName, fieldValue) => {
    errors[fieldName] = isEmpty(fieldName, fieldValue)
    errors[fieldName] ? errors.form.push(fieldName) : removeElement(fieldName)
    errors.form = [...new Set(errors.form)]
  }

  const validateNameField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 4)
    errors[fieldName] ? errors.form.push(fieldName) : removeElement(fieldName)
    errors.form = [...new Set(errors.form)]
  }

  const validateEmailField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isEmail(fieldName, fieldValue)
    errors[fieldName] ? errors.form.push(fieldName) : removeElement(fieldName)
    errors.form = [...new Set(errors.form)]
  }

  const validatePhoneField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isNum(fieldName, fieldValue)
    errors[fieldName] ? errors.form.push(fieldName) : removeElement(fieldName)
    errors.form = [...new Set(errors.form)]
  }

  const validatePasswordField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 6)
    errors[fieldName] ? errors.form.push(fieldName) : removeElement(fieldName)
    errors.form = [...new Set(errors.form)]
  }

  return {
    errors,
    validateEmptyField,
    validateNameField,
    validateEmailField,
    validatePhoneField,
    validatePasswordField,
  }
}
