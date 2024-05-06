'use client'
// import Link from 'next/link';
// import Image from 'next/image';
import { useState } from 'react';
import SideBar from './sideBar';





export default function ConstructionBar() {
  const [sideBar, setSideBar] = useState(false)

  return (
    <main>
      <div className='relative flex top-5 left-5 justify-center rounded-full w-20 h-8 bg-slate-50 text-black'>
        <SideBar state={sideBar} />
      </div>
      <div className=''>
        {/* <SideBar /> */}
        <button className='' onClick={() => {setSideBar(!sideBar)}}>Side Bar</button>

      </div>

    </main>
  
  );
}
// TODO --> Make the sideBar rounded, like at the bottom and top

