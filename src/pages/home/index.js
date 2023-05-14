import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import SignInSide from '../../components/muiComponents/SignIn'

const Home = () => {
    const [loggedIn, setLoggedIn] = useState('')
    useEffect(() => {
        if (localStorage.getItem('rememberMeToken')) {
            setLoggedIn(true)
        }
    },[loggedIn])
    return (
        <div>
            {
                loggedIn ? "Rememerd me" : <SignInSide/>
            }
        </div>
    )
}

export default Home