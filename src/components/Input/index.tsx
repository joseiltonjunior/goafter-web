import findIcon from '@/assets/find.svg'
import { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {}

export function Input({ ...rest }: InputProps) {
  return (
    <div className="flex  rounded-md overflow-hidden">
      <input
        type="text"
        placeholder="Digite um local"
        className="p-2 pl-4 w-full outline-none text-gray-500"
        {...rest}
      />
      <button className="bg-gray-500 px-4 hover:bg-gray-500/90">
        <img src={findIcon} alt="icon input" />
      </button>
    </div>
  )
}
