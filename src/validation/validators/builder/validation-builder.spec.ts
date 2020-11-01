import { ValidationBuilder as sut } from './validation-builder'
import { RequiredFieldValidation } from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('Deve retornar o validador RequiredFieldValidation ', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})