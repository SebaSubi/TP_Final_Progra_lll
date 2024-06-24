"use client";

import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getUserInstanceById } from "../server/userInstance";
import { useEffect } from "react";
import { useUserStore } from "../store/user";
import { Session } from "inspector";
import { setMap } from "../worldMap/continents";

function LoginPage() {
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();
  const { data: session } = useSession();
  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    if ((session?.user as any)?._id) {
      fetchUser((session?.user as any)._id);
      const redirect = async () => {
        const instance = await getUserInstanceById((session?.user as any)?._id);
        if (instance) {
          setMap(instance.country);
          router.replace("/grid");
        } else {
          return router.replace("/worldMap");
        }
      };
      redirect();
    }
  }, [session, fetchUser]);

  const handleForgetPasswordClick = () => {
    router.push('/forget-password');
  };

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const res = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      });


      if (res?.error) {
        return setError(res.error as string);
      }

      if (res?.ok) {
        // sleep(3000);
        // const instance = await getUserInstanceById((session?.user as any)?._id);
        // if (instance.country != "") {
        //   setMap(user.country);
        //   router.replace("/grid");
        // } else {
        //   return router.replace("/worldMap");
        // }
      }
    } catch (error) {
      console.log('Catch Error:', error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setError("Invalid credentials");
        }
      }
    }
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/register');
  };

  return (
    <main className="container mx-auto flex flex-col justify-center items-center bg-black">
      <h2 style={{ textShadow: '3px 3px 2px rgba(255, 0, 0, 0.5)' }} className="text-5xl font-bold mb-6 text-center w-full text-red-500 mr-5"> LOGIN </h2>
      <div className="flex justify-between">
        <form onSubmit={handleSubmit} className="w-full max-w-md mr-6 bg-black border border-gray-300 p-4 flex flex-col justify-center items-center" style={{ boxShadow: '0px 0px 5px 5px rgba(255, 255, 255, 0.2)' }}>
          <input
            type="Email"
            placeholder="Email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-white bg-black"
            style={{ backgroundColor: 'black' }}
          />
          <input
            type="password"
            placeholder=""
            name="password"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-white bg-black"
            style={{ backgroundColor: 'black' }}
          />
          <button
            className="w-full p-2 bg-black mb-4 text-white border border-white rounded-lg font-bold uppercase duration-200 hover:bg-gray-900">
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <button type="button" className="text-1xl text-center text-white p-1 border border-white rounded-lg hover:bg-gray-900 mb-4">
            <a href="/forget-password" onClick={handleForgetPasswordClick} className='text-red'>¿Forgot your password?</a>
          </button>
          <p className="text-1xl text-center text-white">
            ¿Dont have an account? <a href="/register" onClick={handleRegisterClick} className="underline hover:text-red-900">Sign Up</a>
          </p>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
