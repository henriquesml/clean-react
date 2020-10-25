import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import FormContext from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(FormContext)
  const error = errorState[props.name]

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
      />
      <span title={getTitle()} data-testid={`${props.name}-status`} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default input
