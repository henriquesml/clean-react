import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  test('Deve retornar erro se o valor for inválid ', () => {
    const sut = new MinLengthValidation('field', 6)
    const error = sut.validate('12345')
    expect(error).toEqual(new InvalidFieldError(sut.field))
  })
})
