export default function useValidators() {
  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? `Este campo é obrigatório` : ''
  }

  const minLength = (fieldName, fieldValue, min) => {
    return fieldValue.length < min
      ? `Este campo precisa ter ao menos ${min} caractéres`
      : ''
  }

  const isEmail = (fieldName, fieldValue) => {
    let re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !re.test(fieldValue) ? `Preencha com um email válido` : ''
  }

  const isNum = (fieldName, fieldValue) => {
    let isNum = /^\d+$/.test(fieldValue)
    return !isNum ? `Preencha este campo somente com números` : ''
  }

  return { isEmpty, minLength, isEmail, isNum }
}
