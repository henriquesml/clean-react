export class EmailInUseError extends Error {
  constructor () {
    super('E-mail informado já está em uso.')
    this.name = 'EmailInUseError'
  }
}
