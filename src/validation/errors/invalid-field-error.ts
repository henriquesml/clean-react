export class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`O campo ${fieldName} informado esta inválido.`)
  }
}
