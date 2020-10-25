import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { ValidationSpy } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const MakeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy}/>)
  return {
    sut,
    validationSpy
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
    const { sut } = MakeSut()
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
  })

  test('O status do input de email deve ser 🔴 ao inciar', () => {
    const { sut } = MakeSut()
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('O status do input de senha deve estar com status obrigatório ao inciar', () => {
    const { sut } = MakeSut()
    const passwordtatus = sut.getByTestId('password-status')
    expect(passwordtatus.title).toBe('Campo obrigatório')
  })

  test('O status do input de senha deve ser 🔴 ao inciar', () => {
    const { sut } = MakeSut()
    const passwordtatus = sut.getByTestId('password-status')
    expect(passwordtatus.textContent).toBe('🔴')
  })

  test('Deve chamar o validador para o campo email', () => {
    const { sut, validationSpy } = MakeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.fieldName).toEqual('email')
  })

  test('Deve chamar o validador com o valor correto para o email', () => {
    const { sut, validationSpy } = MakeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validationSpy.fieldValue).toEqual('any_email')
  })

  test('Deve chamar o validador para o campo senha', () => {
    const { sut, validationSpy } = MakeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    expect(validationSpy.fieldName).toEqual('password')
  })

  test('Deve chamar o validador com o valor correto para a senha', () => {
    const { sut, validationSpy } = MakeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    expect(validationSpy.fieldValue).toEqual('any_password')
  })
})
