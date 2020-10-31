import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import faker from 'faker'
import Login from './login'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const MakeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy}/>)
  return {
    sut,
    authenticationSpy
  }
}

const MakeParams = (): SutParams => {
  const validationError = faker.random.word()
  return { validationError }
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit')
  fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

describe('Componente login', () => {
  afterEach(cleanup)

  test('Não deve renderizar o spinner e o erro ao iniciar', () => {
    const { sut } = MakeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })

  test('Deve estar desabilidato o botão de login ao inciar', () => {
    const { sut } = MakeSut(MakeParams())
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })

  test('O status do input de email deve estar com status obrigatório ao inciar', () => {
    const params = MakeParams()
    const { sut } = MakeSut(params)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(params.validationError)
  })

  test('O status do input de email deve ser 🔴 ao inciar', () => {
    const { sut } = MakeSut(MakeParams())
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('O status do input de senha deve estar com status obrigatório ao inciar', () => {
    const params = MakeParams()
    const { sut } = MakeSut(params)
    const passwordtatus = sut.getByTestId('password-status')
    expect(passwordtatus.title).toBe(params.validationError)
  })

  test('O status do input de senha deve ser 🔴 ao inciar', () => {
    const { sut } = MakeSut(MakeParams())
    const passwordtatus = sut.getByTestId('password-status')
    expect(passwordtatus.textContent).toBe('🔴')
  })

  test('Deve mostrar o erro no help do input do email quando a validação falhar', () => {
    const params = MakeParams()
    const { sut } = MakeSut(params)
    populateEmailField(sut)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(params.validationError)
  })

  test('Deve mostrar o status de erro no input do email quando a validação falhar', () => {
    const { sut } = MakeSut(MakeParams())
    populateEmailField(sut)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Deve mostrar o erro no help do input da senha quando a validação falhar', () => {
    const params = MakeParams()
    const { sut } = MakeSut(params)
    populatePasswordField(sut)
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(params.validationError)
  })

  test('Deve mostrar o status de erro no input da senha quando a validação falhar', () => {
    const { sut } = MakeSut(MakeParams())
    populatePasswordField(sut)
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Deve mostrar sucesso no help do input do email quando a validação falhar', () => {
    const { sut } = MakeSut()
    populateEmailField(sut)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
  })

  test('Deve mostrar o status de sucesso 💚 no input do email quando a validação falhar', () => {
    const { sut } = MakeSut()
    populateEmailField(sut)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.textContent).toBe('💚')
  })

  test('Deve mostrar sucesso no help do input da senha quando a validação falhar', () => {
    const { sut } = MakeSut()
    populatePasswordField(sut)
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
  })

  test('Deve mostrar o status de sucesso 💚 no input da senha quando a validação falhar', () => {
    const { sut } = MakeSut()
    populatePasswordField(sut)
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.textContent).toBe('💚')
  })
  test('Deve habilitar o botão de submit quando o formulário for válido', () => {
    const { sut } = MakeSut()
    populateEmailField(sut)
    populatePasswordField(sut)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Deve mostrar o spinner de loading no submit', () => {
    const { sut } = MakeSut()
    simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Deve chamar o Authentication com os valores corretos', () => {
    const { sut, authenticationSpy } = MakeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
