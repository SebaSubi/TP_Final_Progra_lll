"use client"

import axios, {AxiosError} from 'axios';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { messages } from '@/utils/messages';

function RegisterPage() {

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const signupResponse = await axios.post('/api/auth/signup', {
        email,
        password,
        fullname,
      })

      const res = await signIn('credentials', {
        email: signupResponse.data.email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        setSuccess("Account created successfully")
        setEmail("");
        setPassword("");
        setFullname("");
        return router.push("/")
      }
  
    } catch(error){
      
      if (error instanceof AxiosError) {
        setError(error.response ?.data.message)
        return Response.json ({
          error: messages.error.needProps
            }
          )
      }
    
    }
  }

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
  }

  return (
    <main className="container mx-auto flex flex-col justify-center items-center min-h-screen bg-black">
      <img src="/p11chad.svg" alt="p11" style={{ width: '15%', height: 'auto' }}/>
      <h2 style={{textShadow: '3px 3px 2px rgba(255, 0, 0, 0.5)'}} className="text-5xl font-bold mb-6 text-center w-full text-red-500 mr-5"> SIGN UP </h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '100%', margin: '0 auto' }}>
        <img src="/barbarianKingDef.svg" style={{ maxWidth: '35%', height: 'auto'}} alt="Barbarian King" />
          <div className="flex justify-center items-center space-x-20" style={{ width: '100%', maxWidth: '100%', height:'70%', maxHeight: '70%' }}>
          <div className="flex justify-between">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-black mr-6 border border-gray-300 p-4 flex flex-col justify-center items-center" style={{boxShadow: '0px 0px 5px 5px rgba(255, 255, 255, 0.2)'}}>
                <input 
                  type="text" 
                  placeholder="Username" 
                  name="fullname" 
                  value={fullname}
                  onChange={e => setFullname(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-white bg-black"
                />
                <input 
                  type="Email" 
                  placeholder="Email" 
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-white bg-black"
                />
                <input 
                  type="password" 
                  placeholder="********" 
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-white bg-black"
                />
                <button 
                  className="w-full p-2 bg-black text-white border border-white rounded-lg font-bold uppercase duration-200 hover:bg-gray-900 mb-4">
                    SIGN-UP
                </button>
                {success && <p className="text-green-500">{success}</p>}
                {error && <p className="text-red-500">{error}</p>}
                <p className="text-1xl text-center text-white">
                 ¿Already have an account? <a href="/register" onClick={handleRegisterClick} className="underline hover:text-red-900">Login</a>
                </p>
              </form>
            </div>
          </div>
        <img src="/newQueenArcher.svg" style={{ maxWidth: '30%', height: 'auto', marginLeft: 50}} alt="Queen Archer" />
      </div>
    </main>
  );
}

export default RegisterPage;