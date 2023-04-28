import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name , setName] = useState();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  
  const register = () => {
    if(!name) alert("Please Enter Name");
    registerWithEmailAndPassword(name , email ,password)
  }
  useEffect(() => {
    if (loading) {
    }
    if (user) {
      router.push("/dashboard" , {replace : true});
    }
  }, [user, loading]);

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gray-400 ">
      <form className=" flex flex-col gap-4 border p-[40px]">
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="border-2 p-2"
          required
        />

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
          onClick={(e) => registerWithEmailAndPassword(name, email, password)}
        >
          Register
        </button>

        <button
          className="p-2 hover:bg-gray-100 bg-black text-white hover:text-black"
          onClick={(e) => signInWithGoogle}
        >
          Sign with google
        </button>

        <div>
          Already Have an account?
          <Link href="/login" className="hover:border-b">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;