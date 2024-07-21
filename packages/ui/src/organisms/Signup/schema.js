import * as Yup from 'yup'

const validationSignInSchema = Yup.object({
  username: Yup.string()
    .min(5, 'Your username must be longer than 5 characters.')
    .required('Required'),
  email: Yup.string().email('Not a valid email').required('Required'),
  password: Yup.string()
    .min(5, 'Your password must be longer than 5 characters.')
    .required('Required'),
})

export { validationSignInSchema }
