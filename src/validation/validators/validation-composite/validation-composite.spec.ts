import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '../test/mock-field-validation'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = new ValidationComposite(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Deve retornar um erro se qualquer um dos validadores falhar', () => {
    const { sut, fieldValidationsSpy } = makeSut()
    fieldValidationsSpy[0].error = new Error('any_error_message')
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('any_error_message')
  })

  test('Deve retornar o primeiro erro se qualquer um dos validadores falhar', () => {
    const { sut, fieldValidationsSpy } = makeSut()
    fieldValidationsSpy[0].error = new Error('first_error')
    fieldValidationsSpy[1].error = new Error('second_error')
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error')
  })

  test('Deve retornar toBeFalsy se os validadores não tiverem erro', () => {
    const { sut } = makeSut()
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBeFalsy()
  })
})
