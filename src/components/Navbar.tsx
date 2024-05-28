"use client"
import Link from 'next/link';
import { useSession } from 'next-auth/react';

function Navbar() {
  const { data: session } = useSession();

  console.log(session);

  

  return (
    <nav className='bg-zinc-600 p-8'>
      <div className='flex justify-between container mx-auto'>
        <Link href="/">
          <h1 className='font-bold text-xl'>NextAuth</h1>
        </Link>
        <ul className='flex gap-x-2'>
        {
            session?.user ? ( // Replace '&&' with '?'

        <>
          <li className='flex gap-x-2'>
            <Link href="/profile" passHref legacyBehavior>
              <a className='px-4 py-2 bg-blue-500 text-white rounded'>Profile</a>
            </Link>
          </li>
          <li className='flex gap-x-2'>
            <Link href="/logout" passHref legacyBehavior>
              <a className='px-4 py-2 bg-blue-500 text-white rounded'>Logout</a>
            </Link>
          </li>
        </>

        ) : (            
        <>
          <li className='flex gap-x-2'>
            <Link href="/login" passHref legacyBehavior>
              <a className='px-4 py-2 bg-blue-500 text-white rounded'>Login</a>
            </Link>
          </li>
          <li className='flex gap-x-2' >
            <Link href="/register" passHref legacyBehavior>
              <a className='px-4 py-2 bg-blue-500 text-white rounded'>Register</a>
            </Link>
          </li>
          <li className='flex gap-x-2'>
            <Link href="/" passHref legacyBehavior>
              <a className='px-4 py-2 bg-blue-500 text-white rounded'>Home</a>
            </Link>
          </li>
        </>
        )
        }
          
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;