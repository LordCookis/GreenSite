import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { services } from '@/services'
import Image from 'next/image'
import Link from 'next/link'

export default function ObjectPage() {
	const [object, setObject] = useState([])
  const router = useRouter()
  const { id } = router.query

	const session = useQuery({
    queryKey: ["session"],
    queryFn: () => services.logreg.checklogin(),
		onSuccess: (data) => console.log(data)
  })

	const thisObject = useQuery({
    queryKey: ["thisObject"],
    queryFn: () => services.base.getRows(),
		onSuccess: (data) => {setObject(data.filter((item) => item.id == id)[0])}
  })

	useEffect(()=>{
		console.log("obj: ",object)
	}, [object])

	const delObject = async() => {
		await services.base.del(id)
		router.push("/")
		thisObject.refetch()
	}
	const editObject = async() => await services.base.upd(id, object)
	
	return(
		<div className="MainPage">
			{session.data
			?
			<div className="ObjectPageDiv">
				<div>
					<Image className='ObjectImage' src={object.image} height={700} width={600} alt=""/><br/><br/>
					<input className="Input" value={object.name}/>
				</div>
				<div className="ObjectDiv">
					<textarea className="Textarea" value={object.description}/>
					<Link href="/mainPage" className="Link"><div className='ExitButton'>X</div></Link>
				</div>
			</div>
			:
			<div className="ObjectPageDiv">
				<div>
					<Image className='ObjectImage' src={object.image} height={700} width={600} alt=""/><br/><br/>
					<input className="Input" value={object.name}/>
				</div>
				<div className="ObjectDiv">
					<textarea className="Textarea" value={object.description}/>
					<Link href="/mainPage" className="Link"><div className='ExitButton'>X</div></Link>
					<button className="Button">РЕДАКТИРОВАТЬ</button>
					<button className="Button" onClick={delObject}>УДАЛИТЬ</button>
				</div>
			</div>
			}
		</div>
	)
}