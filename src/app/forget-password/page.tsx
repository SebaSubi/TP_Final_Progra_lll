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

  return (
    <div className='justify-center h-[calc(100vh-4rem)] flex items-center'>
      <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <input type="Email" placeholder="Email" name="email" value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bd-zinc-800 px-4 oy-2 block mb-2" />
        <button className="bg-indigo-500 px-4 py-2">Submit</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default ForgetPasswordPage;