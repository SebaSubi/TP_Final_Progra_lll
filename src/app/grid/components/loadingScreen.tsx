import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function LoadingScreen(
  { setLoading }: {setLoading: Dispatch<SetStateAction<boolean>>;}
) {
  const [finish, setFinish] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!finish) {
    setLoading(false);
    return null
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className=" relative flex w-4/5 max-w-md p-4  bg-[#f7cd8d] border-[3px] border-[#b7632b] shadow-lg h-48 items-center justify-center">
          <Image 
          width={60}
          height={60}
          src='/p11laburenGIF.gif'
          alt='loadingp11'
          />
        <div className="absolute bottom-3 w-[90%] h-4 bg-gray-300 overflow-hidden ">
          <div className="absolute p-2 bottom-0 h-full bg-[#b7632b] animate-fillBar "></div>
        </div>
      </div>
    </div>
  );
}