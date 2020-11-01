import { ValidationBuilder as sut } from './validation-builder'
import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('Deve retornar o validador RequiredFieldValidation ', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('Deve retornar o validador EmailValidation ', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  test('Deve retornar o validador MinLengthValidation ', () => {
    const validations = sut.field('any_field').min(6).build()
    expect(validations).toEqual([new MinLengthValidation('any_field', 6)])
  })
})
