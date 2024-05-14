import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "@/app/objects/user";
import Collectors from "@/app/collectors/objects/collector";

const iconsArray: any[] = [
  {
    id: 1,
    name: "Gold Collector",
    img: (
      <Image
        key="GoldMine"
        src="/Gold_Mine1.png"
        width={60}
        height={70}
        alt="png of Gold Mine"
      />
    ),
    cost: 100,
    prod_per_hour: 1,
    workers: 1,
    level: 1,
    unlock_level: 2,
    maxWorkers: 1,
    position: { x: 0, y: 0 },
  },
  {
    id: 2,
    name: "Wood Collector",
    img: (
      <Image
        key="WoodCollecor"
        src="/Elexir_Collector.png"
        width={60}
        height={70}
        alt="png of Wood Collector"
      />
    ),
    cost: 100,
    prod_per_hour: 1,
    workers: 1,
    level: 1,
    unlock_level: 1,
    maxWorkers: 1,
    position: { x: 0, y: 0 },
  },
  {
    id: 3,
    name: "Barracs",
    img: (
      <Image
        key="Barracs"
        src="/Barracs.png"
        width={60}
        height={70}
        alt="png of Barracs"
      />
    ),
    cost: 100,
    prod_per_hour: 1,
    workers: 1,
    level: 1,
    unlock_level: 1,
    maxWorkers: 10,
    maxCap: 15,
    position: { x: 0, y: 0 },
  },
];

export default function SideBar({
  user,
  setStructure,
}: {
  user: User;
  setStructure: Dispatch<SetStateAction<number | null>>;
}) {
  const [sideBar, setSideBar] = useState<boolean>(true);

  const SideBarIcon = ({
    collector,
    user,
  }: {
    collector: Collectors;
    user: User;
  }) => {
    if (user.level >= collector.unlock_level) {
      return (
        <div
          className="sidebar-icon group"
          onClick={() => {
            setStructure(collector.id);
          }}
        >
          {collector.img}
          <span className="sidebar-name group-hover:scale-100">
            {collector.name}
            <br />
            Production per hour: {collector.prod_per_hour}
            <br />
            Cost: {collector.cost}
            <br />
            Workers: {collector.workers}
          </span>
        </div>
      );
    } else {
      return (
        <div className="min-lev-req group ">
          <i className="opacity-20">{collector.img}</i>
          <span className="sidebar-name group-hover:scale-100 opacity-80 flex flex-col">
            <div>{`You must be Level: ${collector.unlock_level} to unlock ${collector.name}`}</div>
            <div>{`Current Level: ${user.level}`}</div>
          </span>
        </div>
      );
    }
  };

  // const arrayIcons = [
  //   {
  //     icon: (
  //       <Image
  //         key='GoldMine'

  //         src='/Gold_Mine1.png'
  //         width={60}
  //         height={70}
  //         alt='png of Gold Mine'
  //       />
  //     ),
  //     text: 'Gold Mine',
  //     min_level: 2
  //   },
  //   {
  //     icon: (
  //       <Image
  //         key='Wood_Collector'

  //         src='/Elexir_Collector.png'
  //         width={80}
  //         height={70}
  //         alt='png of Elexir Collector'

  //       />
  //     ),
  //     text: 'Wood Collector',
  //     min_level: 1
  //   }
  // ];

  return (
    <main>
      <div
        className={`fixed top-0 left-[-100px] h-screen w-[100px] m-0 flex flex-col bg-gray-800 shadow-md  transition-all duration-300 ${
          sideBar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {iconsArray.map((collector, index) => (
          <SideBarIcon collector={collector} user={user} key={index} />
        ))}
      </div>
      <div>
        <button
          className={` fixed top-0 left-[5px] transition-all duration-300 ${
            sideBar ? "translate-x-0" : "translate-x-[100px]"
          }`}
          onClick={() => {
            setSideBar(!sideBar);
          }}
        >
          Side Bar
        </button>
      </div>
    </main>
  );
}

//{arrayIcons.map(({ icon, text, min_level }, index) => (
//  <SideBarIcon icon={icon} text={text} min_level={min_level} user={user} key={index} />
//))}
