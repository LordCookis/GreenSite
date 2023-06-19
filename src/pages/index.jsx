import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'
import { services } from '@/services'

export default function MainPage() {

	const thisObject = useQuery({
    queryKey: ["thisObject"],
    queryFn: () => services.base.getRows()
  })

	return(
		<div className="MainDiv">
		{thisObject.data?.map((item) =>
		<Link href={`./${item.id}`} className="Link" key={item.id}>
			<div className="ObjectDiv">
				<div className="Object">
					<div><Image className='ObjectImage' src={item.image} height={250} width={200} alt=""/></div>
					<div className="ObjectText">{item.name}</div><br/>
					<div className="ObjectText">{item.price}₸</div>
				</div>
			</div>
		</Link>).reverse()}
		</div>
	)
}