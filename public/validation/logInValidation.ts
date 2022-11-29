import * as Yup from 'yup'


export function logInValidation(t: (val: string) => string) {
  const emailRegexp = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i
  return Yup.object({
    login: Yup.string()
      .required(t('validations:field_required'))
      .matches(emailRegexp, t('validations:invalid_email_validation')),
    password: Yup.string().required(t('validations:field_required')),
  })
}

