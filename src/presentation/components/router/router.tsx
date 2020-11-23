import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Register } from '@/presentation/pages'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={makeLogin}/>
        <Route path='/register' component={Register} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
