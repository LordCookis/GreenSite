import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { services } from '@/services'
import Image from 'next/image'
import Link from 'next/link'

export default function ObjectPage() {
	const [object, setObject] = useState([])
	const [editState, setEditState] = useState(false)
	const [value, setValue] = useState({
		name: "", 
		description: ""})
	const [valueCopy, setValueCopy] = useState(value)
  const router = useRouter()
  const { id } = router.query

	useEffect(()=>{
		setValue({
			name: object.name, 
			description: object.description
		}),
		setValueCopy(value)
	})

	const session = useQuery({
    queryKey: ["session"],
    queryFn: () => services.logreg.checkLogin(),
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

	const editObject = async() => {
		setEditState(true)
		//await services.base.upd(id, object)
	}

	return(
		<div className="MainPage">
			{session.data
			?
			<div className="ObjectPageDiv">
				<div>
					<Image className='ObjectImage' src={object.image} height={700} width={600} alt=""/><br/><br/>
					<input className="Input" value={value.name} disabled={!editState}/>
				</div>
				<div className="ObjectDiv">
					<textarea className="Textarea" value={value.description} disabled={!editState}/>
					<Link href="/mainPage" className="Link"><div className='ExitButton'>X</div></Link>
				</div>
			</div>
			:
			<div className="ObjectPageDiv">
				<div>
					<Image className='ObjectImage' src={object.image} height={700} width={600} alt=""/><br/><br/>
					<input className="Input" value={value.name} onChange={(e)=>setValue(e.target.value)} disabled={!editState}/>
				</div>
				<div className="ObjectDiv">
					<div className="ObjectInfo">
						<textarea className="Textarea" value={value.description} disabled={!editState}/>
					</div>
					<div className="ObjectAdmin">
						<button className="Button" onClick={editObject}>РЕДАКТИРОВАТЬ</button>
						<button className="Button" onClick={delObject}>УДАЛИТЬ</button>
						<Link href="/mainPage" className="Link"><div className='ExitButton'>X</div></Link>
					</div>
				</div>
			</div>
			}
		</div>
	)
}