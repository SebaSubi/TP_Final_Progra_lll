import Link from 'next/link';
import RemoveBtn from './RemoveBtn'
import {HiPencilAlt} from 'react-icons/hi';



export default function TopicsList () {
  return (
    <>
    
    <div className='p-4 border border-slate-300 my-3 flex justify-between gap-5'>
      <div>
        <h2 className='font-bold text-2xl'>Topics</h2>
        <div>Description</div>
      </div>

      <div className=''>
        <RemoveBtn />
        <button>
        <Link href={'/editTopic/123'} />
          <HiPencilAlt size={24} />
          </button>
      </div>


    </div>
    
    </>
  )
}

