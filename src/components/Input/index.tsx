import findIcon from '@/assets/find.svg'
import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {}

export function Input({ ...rest }: InputProps) {
  return (
    <div className="flex bg-white rounded-md overflow-hidden">
      <input
        type="text"
        placeholder="Digite um local"
        className="p-2 pl-4 w-full outline-none"
        {...rest}
      />
      <button className="bg-blue-400 px-4 hover:bg-blue-400/80">
        <img src={findIcon} alt="icon input" />
      </button>
    </div>
  )
}
