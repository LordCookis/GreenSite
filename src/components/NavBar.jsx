import Link from 'next/link'

export default function NavBar() {
  return(
    <>
    <div className="NavBar">
      <Link href="/adminPanel" className="Link">ПАНЕЛЬ АДМИНИСТРАТОРА</Link>
      <Link href="/logReg" className="Link">РЕГИСТРАЦИЯ</Link>
      <Link href="/mainPage" className="Link">ПЕРЕЙТИ НА САЙТ</Link>
    </div>
    </>
  )
}