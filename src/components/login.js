import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLoginMutation } from "../redux/commonApiCall";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  
  const [login, { isLoading, error: loginError }] = useLoginMutation();

  useEffect(() => {
    if (loading) {
    }
    if (user) {
      router.push("/dashboard");
    }
  }, [user, loading]);
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({ email, password })
      console.log(data)
    } catch (error) {
      alert(error)
    }
    
  }
  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-400 ">
      <form className=" flex flex-col gap-4 border p-[40px]">
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 p-2"
          required
        />

        <input
          type="password"
          value={password}
          required
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 p-2"
        />

        <button
          className="p-2 hover:bg-gray-100 bg-blue-400 text-white hover:text-black "
          onClick={handleLogin}
        >
          Login
        </button>

        <button
          className="p-2 hover:bg-gray-100 bg-black text-white hover:text-black"
          onClick={(e) => handleLogin}
        >
          Login with google
        </button>

        <div className="text-center hover:border-b ">
          <Link href="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't Have an account?
          <Link href="/register" className="hover:border-b">
            Register
          </Link>
          Now
        </div>
      </form>
    </div>
  );
};

export default Login;
