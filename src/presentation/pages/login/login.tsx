import React from 'react'
import Styles from './login-styles.scss'
import {
  LoginHeader as Header,
  Spinner,
  Input,
  Footer
} from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header/>
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
        <button className={Styles.submit} type="submit">
          Entrar
        </button>

        <span className={Styles.link}>
          Não possui um conta? Crie uma agora mesmo!
        </span>

        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner}/>
          <span className={Styles.error}>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
