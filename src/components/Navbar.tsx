import Link from 'next/link';
import { getServerSession } from 'next-auth';

async function Navbar(){
  // Get the user's session based on the request
  const session = await getServerSession();

  return(
    <nav className='bg-zinc-600 p-8'>
      <div className='flex justify-between container mx-auto'>
        <Link href="/">
          <h1 className='font-bold text-xl'>NextAuth</h1>
        </Link>

        <ul className='flex gap-x-2'>
          {
            session ? (
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
            ): (
              <>
              <li className='flex gap-x-2'>
              <Link href="/dashboard/profile" passHref legacyBehavior>
                <a className='px-4 py-2 bg-blue-500 text-white rounded'>Perfil</a>
              </Link>
              </li>

              <li className='flex gap-x-2'>
              <Link href="/about" passHref legacyBehavior>
                <a className='px-4 py-2 bg-blue-500 text-white rounded'>About</a>
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