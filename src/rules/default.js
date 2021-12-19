const required = (field) => {
  return v => !!v || `${field} is required`
}
const maxLength = (field, length) => {
  return v => v.length <= length || `${field} must be less than ${length}`
}
const minLength = (field, length) => {
  return v => v.length >= length || `${field} must be at least ${length}`
}

const email = v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'

export default {
  required,
  maxLength,
  minLength,
  email
}
