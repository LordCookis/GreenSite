import { useState } from "react"
import { useQuery } from '@tanstack/react-query'
import { services } from '@/services'

export default function LogReg() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
	const [checkPassword, setCheckPassword] = useState("")

	const session = useQuery({
    queryKey: ["session"],
    queryFn: () => services.logreg.get(login, password),
		enabled: false
  })

	const log = async(e) => {
		e.preventDefault()
		await session.refetch()
		setLogin()
		setPassword()
	}
	
	const reg = async(e) => {
		e.preventDefault()
		if (password == checkPassword) {
			await services.logreg.add(login, password)
			await session.refetch()
			setLogin()
			setPassword()
			setCheckPassword()
		} else {
			return
		}
	}

	const exit = async() => services.logreg.exit()

  return(
		<div className="MainDiv">
			{!session.data
      ?
			<form className="LogRegForm" onSubmit={log}>
				<input className="Input" value={login} placeholder="Введите логин" onChange={(e)=>setLogin(e.target.value)}/><br/>
				<input className="Input" value={password} type="password" placeholder="Введите пароль" onChange={(e)=>setPassword(e.target.value)}/><br/>
				<button className="Button">ВОЙТИ</button>
			</form>
			:
			<>
			<form className="LogRegForm" onSubmit={reg}>
				<input className="Input" value={login} placeholder="Введите логин" onChange={(e)=>setLogin(e.target.value)}/><br/>
				<input className="Input" value={password} type="password" placeholder="Введите пароль" onChange={(e)=>setPassword(e.target.value)}/><br/>
				<input className="Input" value={checkPassword} type="password" placeholder="Повторите пароль" onChange={(e)=>setCheckPassword(e.target.value)}/><br/>
				<button className="Button">ЗАРЕГИСТИРОВАТЬ</button>
			</form>
			<form className="LogRegForm" onSubmit={exit}>
			<button className="Button">ВЫЙТИ</button>
			</form>
			</>
			}
		</div>
	)
}