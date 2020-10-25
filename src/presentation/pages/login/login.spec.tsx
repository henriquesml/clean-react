import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Login from './login'

type SutTypes = {
  sut: RenderResult
}

const MakeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut
  }
}

describe('Componente login', () => {
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
})
