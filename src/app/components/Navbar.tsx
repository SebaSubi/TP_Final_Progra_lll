
import Link from 'next/link';

export default function Navbar(){
  return (
    <nav className='flex justify-between items-center'>
    <Link href= {"/addTopic"} className="bg-white p-2" >
          Add Topic
      </Link>

      </nav>
  )
}