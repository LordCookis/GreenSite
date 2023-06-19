import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { services } from '@/services'
import Image from 'next/image'
import Link from 'next/link'

export default function ObjectPage() {
	const [object, setObject] = useState({
		name: "",
		description: "",
		image: "",
		price: ""
	})
	const [objectCopy, setObjectCopy] = useState({})
	const [image, setImage] = useState([])
	const [editState, setEditState] = useState(false)
  const router = useRouter()
  const { id } = router.query

	const session = useQuery({
    queryKey: ["session"]
  })

	const thisObject = useQuery({
    queryKey: ["thisObject"],
    queryFn: () => services.base.getRows(),
		onSuccess: (data) => {
			setObject(data.filter((item) => item.id == id)[0])
			setObjectCopy(data.filter((item) => item.id == id)[0])
		}
  })

	const delObject = async() => {
		await services.base.del(id)
		router.push("/")
		thisObject.refetch()
	}

	const editObject = async() => {
		console.log("1",image)
		sendUpdate.mutate()
		setEditState(false)
		console.log("id ", id)
	}

	const cancelFucn = () => {
		setEditState(false)
		setObject(objectCopy)
	}

	const uploadImage = async(e) => setImage(e.target.files[0])

	const sendUpdate = useMutation({
    mutationFn: () => {
      return services.base.upd(id, object, image)
    },
		onSuccess: () => thisObject.refetch()
  })

	return(
		<div className="MainPage">
			<div className="ObjectPageDiv">
				<div>
					<Image className='ObjectImage' src={object.image} height={700} width={600} alt=""/><br/><br/>
					<div className="ObjectName">
						<input className="Input" value={object.name} onChange={(e)=>setObject({...object, name: e.target.value})} disabled={!editState}/>
						<div>
							<input className="InputCost" value={object.price} onChange={(e)=>setObject({...object, price: e.target.value})} disabled={!editState}/><span className="Span">₸</span>
						</div>
					</div>
				</div>
				<div className="ObjectDiv">
					<div className="ObjectInfo">
					<textarea className="Textarea" value={object.description} onChange={(e)=>setObject({...object, description: e.target.value})} disabled={!editState}/>
					</div>
					{session.data ?
					!editState
					?
					<div className="ObjectAdmin">
						<input className="Image" autoComplete="off" name={object.image} type="file" onChange={uploadImage}/>
						<button className="Button" onClick={()=>setEditState(true)}>РЕДАКТИРОВАТЬ</button>
						<button className="Button" onClick={delObject}>УДАЛИТЬ</button>
						<Link href="/" className="Link"><div className='ExitButton'>X</div></Link>
					</div>
					:
					<div className="ObjectAdmin">
						<input className="Image" autoComplete="off" name={object.image} type="file" onChange={uploadImage}/>
						<button className="Button" onClick={editObject}>ПОДТВЕРДИТЬ</button>
						<button className="Button" onClick={cancelFucn}>ОТМЕНА</button>
						<Link href="/" className="Link"><div className='ExitButton'>X</div></Link>
					</div>
					:
					<div className="ObjectAdmin">
						<Link href="/" className="Link"><div className='ExitButton'>X</div></Link>
					</div>
					}
				</div>
			</div>
		</div>
	)
}