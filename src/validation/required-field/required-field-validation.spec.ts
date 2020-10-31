import { RequiredFieldValidation } from '@/validation/required-field/required-field-validation'
import { RequiredFieldError } from '@/validation/error'
import fake from 'faker'

describe('RequiredFieldValidation', () => {
  test('Deve retronar um erro se o campo estiver vazio', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Deve retornar falsy se o campo não estiver vazio', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate(fake.random.word())
    expect(error).toBeFalsy()
  })
})
