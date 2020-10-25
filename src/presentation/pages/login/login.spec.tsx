import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Componente login', () => {
  test('Não deve renderizar o spinner e o erro ao iniciar', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
})
