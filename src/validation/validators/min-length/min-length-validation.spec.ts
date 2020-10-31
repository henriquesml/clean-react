import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 6)

describe('MinLengthValidation', () => {
  test('Deve retornar erro se o valor for inválido', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toEqual(new InvalidFieldError(sut.field))
  })
  test('Deve retornar falsy se o valor for válido', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(6))
    expect(error).toBeFalsy()
  })
})
