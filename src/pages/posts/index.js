import React, { useEffect , usestate } from 'react'
import { useRouter } from 'next/router'

const index = () => {
    const router = useRouter()
    const [loggedIn , isLoggedIn] = usestate(false)
    useEffect(() => {
        if (localStorage.getItem("rememberMeToken")) {
            router.push('/posts')
        }
    })
  return (
    <div>index</div>
  )
}

export default index