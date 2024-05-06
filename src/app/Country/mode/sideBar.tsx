import Image from "next/image";



export default function SideBar({ visibility }: { visibility: boolean }) {
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
          width={60}
          height={70}
          alt='png of Elexir Collector'
        />
      ),
      text: 'Wood Collector'
    }
  ];
  
  return (
    <div className="fixed top-0 left-0 h-screen w-25 m-0 flex flex-col bg-gray-200 shadow-md">
       {arrayIcons.map(({ icon, text }, index) => (
        <SideBarIcon icon={icon} text={text} key={index} />
      ))}
     </div>
  );
  
}
