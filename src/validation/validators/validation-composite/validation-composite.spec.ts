import faker from 'faker'
import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '../test/mock-field-validation'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = new ValidationComposite(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Deve retornar um erro se qualquer um dos validadores falhar', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const errorMessage = faker.random.words()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    const error = sut.validate(fieldName, faker.random.words())
    expect(error).toBe(errorMessage)
  })

  test('Deve retornar o primeiro erro se qualquer um dos validadores falhar', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const errorMessage1 = faker.random.words()
    const errorMessage2 = faker.random.words()
    fieldValidationsSpy[0].error = new Error(errorMessage1)
    fieldValidationsSpy[1].error = new Error(errorMessage2)
    const error = sut.validate(fieldName, faker.random.words())
    expect(error).toBe(errorMessage1)
  })

  test('Deve retornar toBeFalsy se os validadores não tiverem erro', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, faker.random.words())
    expect(error).toBeFalsy()
  })
})
