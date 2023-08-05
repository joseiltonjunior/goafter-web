import logoAfter from '@/assets/logo-goafter.png'

export function Header() {
  return (
    <div className="w-full bg-gray-500 flex items-center px-8 py-2">
      <img src={logoAfter} alt="" className="w-12 h-12 ml-auto mr-auto" />
    </div>
  )
}
