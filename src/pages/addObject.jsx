import { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { supabase } from '../supabaseClient'
import { services } from '@/services'

export default function addObject() {
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [image, setImage] = useState([])
	const [price, setPrice] = useState("")
	const [object, setObject] = useState({})

	const addObject = (e) => {
    e.preventDefault()
    const id = Math.floor(Math.random() * 999999) 
    if (!name) {return}
    const product = {
      id,
      name,
      description,
			price
    }
    setObject([...object, product])
    services.base.add(id, name, description, price)
  }

	const uploadImage = async (e) => {
		setImage(e.target.files[0])
		const filename = `${uuidv4()}-${image.name}`

		const { data, error } = await supabase.storage
			.from("Images")
			.upload(filename, image, {
        cacheControl: "3600",
        upsert: false,
      })

    const filepath = data.path
	}

	return(
		<div className="MainDiv">
			<form className="AddObjectForm">	
				<span className="Span">ДОБАВИТЬ ТОВАР</span><br/>
				<input className="Input" autoComplete="off" value={name} placeholder="Введите название товара" onChange={(e)=>setName(e.target.value)}/><br/>
				<textarea className="Textarea" autoComplete="off" value={description} placeholder="Введите описание товара" onChange={(e)=>setDescription(e.target.value)}/><br/>
				<input className="Image" autoComplete="off" name={image} type="file" onChange={uploadImage}/><br/>
				<input className="Input" autoComplete="off" value={price} placeholder="Введите цену товара" onChange={(e)=>setPrice(e.target.value)}/><br/>
				<button className="Button">ДОБАВИТЬ</button>
			</form>
		</div>
	)
}