import { ValidationBuilder as sut } from './validation-builder'
import { RequiredFieldValidation } from '@/validation/validators'
import { EmailValidation } from '../email/email-validation'

describe('ValidationBuilder', () => {
  test('Deve retornar o validador RequiredFieldValidation ', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('Deve retornar o validador EmailValidation ', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })
})
