import React, { useState } from 'react'
import Styles from './login-styles.scss'
import {
  LoginHeader as Header,
  Input,
  FormStatus,
  Footer
} from '@/presentation/components'

import FormContext from '@/presentation/contexts/form/form-context'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.login}>
      <Header/>
      <FormContext.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
          />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button data-testid="submit" disabled className={Styles.submit} type="submit">
            Entrar
          </button>

          <span className={Styles.link}>
            Não possui um conta? Crie uma agora mesmo!
          </span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
