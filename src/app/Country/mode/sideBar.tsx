import Image from "next/image";
import { useState } from "react";



export default function SideBar() {
  const [sideBar, setSideBar] = useState<boolean>(true)

  const SideBarIcon = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <div className='sidebar-icon group'>
      {icon}
      <span className='sidebar-name group-hover:scale-100'>
        {text}
      </span>
    </div>
  );
  
  const arrayIcons = [
    {
      icon: (
        <Image 
          key='GoldMine'
  
          src='/Gold_Mine1.png'
          width={60}
          height={70}
          alt='png of Gold Mine'
        />
      ),
      text: 'Gold Mine'
    },
    {
      icon: (
        <Image 
          key='Wood_Collector'
  
          src='/Elexir_Collector.png'
          width={80}
          height={70}
          alt='png of Elexir Collector'

        />
      ),
      text: 'Wood Collector'
    }
  ];
  
  return (
    <main>
      <div className={`fixed top-0 left-[-100px] h-screen w-[100px] m-0 flex flex-col bg-gray-200 shadow-md transition-all duration-300 ${sideBar ? 'translate-x-0' : 'translate-x-full'}`}>
       {arrayIcons.map(({ icon, text }, index) => (
        <SideBarIcon icon={icon} text={text} key={index} />
      ))}
     </div>
     <div>
      <button className={` fixed top-0 left-[5px] transition-all duration-300 ${sideBar ? 'translate-x-0' : 'translate-x-[100px]'}`} onClick={() => {setSideBar(!sideBar)}}>Side Bar</button>
     </div>
    </main>
    
     
  );
  
}
