
"use client"
import axios, {AxiosError} from 'axios';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


function RegisterPage() {

  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)

    try {

    const signupResponse = await axios.post('/api/auth/signup', {
      email: formData.get('email'),
      password: formData.get('password'),
      fullname: formData.get('fullname'),
    })

    
    const res = await signIn('credentials', {
      email: signupResponse.data.email,
      password: formData.get('password'),
      redirect: false,
    });
    

    if (res?.ok) return router.push("/login")
  
    } catch(error){
      console.log(error)
      if (error instanceof AxiosError) {
        setError(error.response ?.data.message)
      }
    }
  }

  return (

      <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
        <form onSubmit={handleSubmit}>
          
          <h1>Register</h1>
          <input type="text" placeholder="Username" name="fullname" className="bd-zinc-800 px-4 oy-2 block mb-2" />
          <input type="Email" placeholder="Email" name="email"
          className="bd-zinc-800 px-4 oy-2 block mb-2" />
          <input type="password" placeholder="********" name="password"
          className="bd-zinc-800 px-4 oy-2 block mb-2"/>
          <button className="bg-indigo-500 px-4 py-2">Register</button>
        </form>
      </div>
  );
}

export default RegisterPage;