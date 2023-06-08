import Link from 'next/link'
import logReg from '@/pages/logReg'
import mainPage from '@/pages/mainPage'

export default function NavBar() {
  return(
    <>
    <div className="NavBar">
      <Link href="/adminPanel" className="link">ПАНЕЛЬ АДМИНИСТРАТОРА</Link>
      <Link href="/logReg" className="link">РЕГИСТРАЦИЯ</Link>
      <Link href="/mainPage" className="link">ПЕРЕЙТИ НА САЙТ</Link>
    </div>
    </>
  )
}