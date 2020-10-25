import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Componente login', () => {
  test('Não deve renderizar o spinner e o erro ao iniciar', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
  test('Deve estar desabilidato o botão de login ao inciar', () => {
    const { getByTestId } = render(<Login />)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })
  test('O status do input de email deve estar com status obrigatório ao inciar', () => {
    const { getByTestId } = render(<Login />)
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
  })
  test('O status do input de email deve ser 🔴 ao inciar', () => {
    const { getByTestId } = render(<Login />)
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.textContent).toBe('🔴')
  })
  test('O status do input de senha deve estar com status obrigatório ao inciar', () => {
    const { getByTestId } = render(<Login />)
    const passwordtatus = getByTestId('password-status')
    expect(passwordtatus.title).toBe('Campo obrigatório')
  })
  test('O status do input de senha deve ser 🔴 ao inciar', () => {
    const { getByTestId } = render(<Login />)
    const passwordtatus = getByTestId('password-status')
    expect(passwordtatus.textContent).toBe('🔴')
  })
})
