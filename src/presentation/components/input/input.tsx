import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import FormContext from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]

  function handleChange (event: React.ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function getStatus (): string {
    return '🔴'
  }

  function getTitle (): string {
    return error
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        data-testid={props.name}
        onChange={e => handleChange(e)}
      />
      <span title={getTitle()} data-testid={`${props.name}-status`} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default input
