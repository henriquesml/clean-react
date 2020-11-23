import React, { } from 'react'
import { Link } from 'react-router-dom'
import Styles from './register-styles.scss'
import {
  LoginHeader as Header,
  Input,
  FormStatus,
  Footer
} from '@/presentation/components'

import FormContext from '@/presentation/contexts/form/form-context'

const Register: React.FC = () => {
  return (
    <div className={Styles.register}>
      <Header/>
      <FormContext.Provider value={{ state: {} }}>
        <form className={Styles.form}>
          <h2>Criar conta</h2>
          <Input
            type='text'
            name='name'
            placeholder='Digite seu nome'
          />
          <Input
            type='email'
            name='email'
            placeholder='Digite seu e-mail'
          />
          <Input
            type='password'
            name='password'
            placeholder='Digite sua senha'
          />
          <Input
            type='password'
            name='passwordConfirmation'
            placeholder='Confirme sua senha'
          />
          <button className={Styles.submit} type='submit'>
            Cadastrar
          </button>

          <Link to='/login' className={Styles.link}>
            Já possuo uma conta.
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Register
