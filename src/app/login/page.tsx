"use client"

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function LoginPage() {

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (res?.error) return setError(res.error as string)

    if (res?.ok) return router.push("/construccion_logic")
  }

  return (
    <div className='justify-center h-[calc(100vh-4rem)] flex items-center'>
      <form onSubmit={handleSubmit}>
        <h1>Sign in </h1>
        <input type="Email" placeholder="Email" name="email"
        className="bd-zinc-800 px-4 oy-2 block mb-2" />
        <input type="password" placeholder="********" name="password"
        className="bd-zinc-800 px-4 oy-2 block mb-2"/>
        <button className="bg-indigo-500 px-4 py-2">Login</button>
        <Link href="/forget-password"  legacyBehavior>
          <a className="text-blue-500 hover:underline">Forgot password?</a>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;