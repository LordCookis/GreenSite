import { useQuery } from "@tanstack/react-query"
import NavBar from "@/components/NavBar"

export default function Layout({children}) {

  const session = useQuery({
    queryKey: ["session"],
    queryFn: () => {console.log("Москва Любино работаем")}
  })

  return(
    <>
      <NavBar session={session.data}/>
      {children}
    </>
  )
}