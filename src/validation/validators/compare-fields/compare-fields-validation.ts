
import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string, private readonly valueToCompare: any) {}

  validate (value: any): Error {
    return value !== this.valueToCompare ? new InvalidFieldError(this.field) : null
  }
}