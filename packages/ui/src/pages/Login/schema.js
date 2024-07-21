import * as Yup from 'yup'

const validationSignInSchema = Yup.object({
  email: Yup.string().email('Not a valid email').required('Required'),
  password: Yup.string().required('Required'),
})

export { validationSignInSchema }
