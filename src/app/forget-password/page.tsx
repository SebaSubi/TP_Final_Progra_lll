"use client"
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

function ForgetPasswordPage() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/forget-password', { email });

      if (res.status === 200) {
        setMessage("Check your email for a link to reset your password.");
      } else {
        setMessage("Something went wrong.");
      }
    } catch (error) {
      setMessage("An error occurred.");
    }
  }

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
  }

  return (
    <main className="container mx-auto flex flex-col justify-center items-center min-h-screen bg-black">
      <img src="/p11chad.svg" alt="p11" className='mb-5' style={{ width: '15%', height: 'auto' }}/>
      <div className='justify-center flex items-center'>
        <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 border border-white rounded-lg">
          <h2 style={{textShadow: '3px 3px 2px rgba(255, 0, 0, 0.5)'}} className="text-2xl font-bold mb-6 text-center w-full text-red-500 mr-5"> Reset your Password </h2>
            <input 
              type="Email" 
              placeholder="Email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-white bg-black"
            />
            <button className="text-1xl text-center text-white p-1 border border-white rounded-lg hover:bg-gray-900 mb-4 mr-2">Submit</button>

            <p className="text-1xl text-center text-white">
              <a href="/register" onClick={handleRegisterClick} className="underline hover:text-red-900">Go Back</a>
            </p>
            {message && <p>{message}</p>}
        </form>
      </div>
    </main>
  );
}

export default ForgetPasswordPage;