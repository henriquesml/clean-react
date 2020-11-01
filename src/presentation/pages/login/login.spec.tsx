import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import 'jest-localstorage-mock'
import faker from 'faker'
import { Login } from '@/presentation/pages'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const MakeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy}/>
    </Router>
  )
  return {
    sut,
    authenticationSpy
  }
}

const MakeParams = (): SutParams => {
  const validationError = faker.random.word()
  return { validationError }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
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

  beforeEach(() => {
    localStorage.clear()
  })
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

  test('Deve mostrar o spinner de loading no submit', async () => {
    const { sut } = MakeSut()
    await simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Deve chamar o Authentication com os valores corretos', async () => {
    const { sut, authenticationSpy } = MakeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Deve chamar o Authentication somente uma vez', async () => {
    const { sut, authenticationSpy } = MakeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Não deve chamar o Authentication com o formulário inválido', async () => {
    const { sut, authenticationSpy } = MakeSut(MakeParams())
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Deve mostrar um erro se a authenticação falhar', async () => {
    const { sut, authenticationSpy } = MakeSut()
    const invalidCredentialsError = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(invalidCredentialsError))
    await simulateValidSubmit(sut)
    const mainError = sut.getByTestId('main-error')
    expect(mainError.textContent).toBe(invalidCredentialsError.message)
  })

  test('Deve esconder o spinner e somente mostrar o erro quando a autenticação falhar', async () => {
    const { sut, authenticationSpy } = MakeSut()
    const invalidCredentialsError = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(invalidCredentialsError))
    await simulateValidSubmit(sut)
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(1)
  })

  test('Deve adicionar o token de acesso no localstorage quando a autenticação for efetuada com sucesso', async () => {
    const { sut, authenticationSpy } = MakeSut()
    await simulateValidSubmit(sut)
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
  })

  test('Deve renderizar para / após a autenticação set efetuada com sucesso', async () => {
    const { sut } = MakeSut()
    await simulateValidSubmit(sut)
    expect(history.location.pathname).toBe('/')
  })

  test('Deve subistituir o historico após a autenticação set efetuada com sucesso', async () => {
    const { sut } = MakeSut()
    await simulateValidSubmit(sut)
    expect(history.length).toBe(1)
  })

  test('Deve fazer atualizar o historico de navegação ao clicar no botão de registrar', () => {
    const { sut } = MakeSut()
    const historyCount = history.length
    const register = sut.getByTestId('register')
    fireEvent.click(register)
    expect(history.length).toBe(historyCount + 1)
  })

  test('Deve navegar para a pagina de cadastro', () => {
    const { sut } = MakeSut()
    const register = sut.getByTestId('register')
    fireEvent.click(register)
    expect(history.location.pathname).toBe('/register')
  })
})
