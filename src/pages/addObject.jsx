import { useState } from 'react'
import { services } from '@/services'

export default function AddObject() {
	const [image, setImage] = useState([])
	const [object, setObject] = useState({
		name: "",
		description: "",
		price: ""
	})

	const addObject = async(e) => {
    e.preventDefault()
    if (!object.name && !image) {return}
    const result = await services.base.add(object, image)
		setObject({
			name: "",
			description: "",
			price: ""
		})
		setImage([])
  }

	const uploadImage = async(e) => setImage(e.target.files[0])

	return(
		<div className="MainDiv">
			<form className="AddObjectForm" onSubmit={addObject}>	
				<span className="Span">ДОБАВИТЬ ТОВАР</span><br/>
				<input className="Input" autoComplete="off" value={object.name} placeholder="Введите название товара" onChange={(e)=>setObject({...object, name: e.target.value})}/><br/>
				<textarea className="Textarea" autoComplete="off" value={object.description} placeholder="Введите описание товара" onChange={(e)=>setObject({...object, description: e.target.value})}/><br/>
				<input className="Image" autoComplete="off" name={image} type="file" onChange={uploadImage}/><br/>
				<input className="Input" autoComplete="off" value={object.price} placeholder="Введите цену товара" onChange={(e)=>setObject({...object, price: e.target.value})}/><br/>
				<button className="Button">ДОБАВИТЬ</button>
			</form>
		</div>
	)
}