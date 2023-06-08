import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function mainPage() {
	
	return(
		<Link href="./objectPage" className="Link">
			<div className="MainDiv">
				<div className="ObjectDiv">
					<div className="Object">
						<div className="ObjectImage"><Image height={250} width={200} className='ObjectImage'/></div>
						<div className="ObjectText">Оригея</div><br/>
						<div className="ObjectText">666тг</div>
					</div>
				</div>
			</div>
		</Link>
	)
}