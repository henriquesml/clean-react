import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import faker from 'faker'
import Login from './login'
import { ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const MakeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.word()
  const sut = render(<Login validation={validationStub}/>)
  return {
    sut,
    validationStub
  }
}

describe('Componente login', () => {
  afterEach(cleanup)

  test('Não deve renderizar o spinner e o erro ao iniciar', () => {
    const { sut } = MakeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Deve estar desabilidato o botão de login ao inciar', () => {
    const { sut } = MakeSut()
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })

  test('O status do input de email deve estar com status obrigatório ao inciar', () => {
    const { sut, validationStub } = MakeSut()
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
  })

  test('O status do input de email deve ser 🔴 ao inciar', () => {
    const { sut } = MakeSut()
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('O status do input de senha deve estar com status obrigatório ao inciar', () => {
    const { sut, validationStub } = MakeSut()
    const passwordtatus = sut.getByTestId('password-status')
    expect(passwordtatus.title).toBe(validationStub.errorMessage)
  })

  test('O status do input de senha deve ser 🔴 ao inciar', () => {
    const { sut } = MakeSut()
    const passwordtatus = sut.getByTestId('password-status')
    expect(passwordtatus.textContent).toBe('🔴')
  })

  test('Deve mostrar o erro no help do input do email quando a validação falhar', () => {
    const { sut, validationStub } = MakeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
  })

  test('Deve mostrar o status de erro no input do email quando a validação falhar', () => {
    const { sut } = MakeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Deve mostrar o erro no help do input da senha quando a validação falhar', () => {
    const { sut, validationStub } = MakeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
  })

  test('Deve mostrar o status de erro no input da senha quando a validação falhar', () => {
    const { sut } = MakeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Deve mostrar sucesso no help do input do email quando a validação falhar', () => {
    const { sut, validationStub } = MakeSut()
    const emailInput = sut.getByTestId('email')
    validationStub.errorMessage = null
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
  })

  test('Deve mostrar o status de sucesso no input do email quando a validação falhar', () => {
    const { sut, validationStub } = MakeSut()
    const emailInput = sut.getByTestId('email')
    validationStub.errorMessage = null
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.textContent).toBe('💚')
  })

  test('Deve mostrar sucesso no help do input da senha quando a validação falhar', () => {
    const { sut, validationStub } = MakeSut()
    const passwordInput = sut.getByTestId('password')
    validationStub.errorMessage = null
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
  })

  test('Deve mostrar o status de sucesso no input da senha quando a validação falhar', () => {
    const { sut, validationStub } = MakeSut()
    const passwordInput = sut.getByTestId('password')
    validationStub.errorMessage = null
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.textContent).toBe('💚')
  })
  test('Deve habilitar o botão de submit quando o formulário for válido', () => {
    const { sut, validationStub } = MakeSut()
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    validationStub.errorMessage = null
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
})
