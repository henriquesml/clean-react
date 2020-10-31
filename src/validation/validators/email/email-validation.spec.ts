import faker from 'faker'
import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
  test('Deve retronar um erro se o campo de email for inválido', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError(sut.field))
  })

  test('Deve retronar falsy se o campo de email for válido', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })

  test('Deve retronar falsy se o campo de email for vazio', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toBeFalsy()
  })
})
