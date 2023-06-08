import Link from 'next/link'
import addObject from '@/pages/addObject'
import delObject from '@/pages/delObject'
import editObject from '@/pages/editObject'

export default function adminPanel() {
	
	return(
		<div className="MainDiv">
      <Link href="/addObject" className="link">ДОБАВИТЬ ТОВАР</Link>
      <Link href="/delObject" className="link">УДАЛИТЬ ТОВАР</Link>
      <Link href="/editObject" className="link">РЕДАКТИРОВАТЬ ТОВАР</Link>
		</div>
	)
}