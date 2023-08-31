import logoAfter from '@/assets/logo-goafter.png'
import { headerStyles } from './styles'

export function Header() {
  return (
    <div className={headerStyles.container}>
      <img src={logoAfter} alt="logo icon" className={headerStyles.logo} />
    </div>
  )
}
