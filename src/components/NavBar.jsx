import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

export default function NavBar() {

  const session = useQuery({
    queryKey: ["session"]
  })

  return(
    <div className="NavBar">
      <Link href="/logReg" className="Link">РЕГИСТРАЦИЯ</Link>
      {session ? <Link href="/addObject" className="AddLink">+</Link> : "" }
      <Link href="/" className="Link">ПЕРЕЙТИ НА САЙТ</Link>
    </div>
  )
}