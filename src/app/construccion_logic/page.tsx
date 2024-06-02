"use client";

import Image from "next/image";
import Placer from "./components/objectPlacer";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  glod_mine_Array,
  lumber_camp_Array,
  stone_mine_Array,
  barracs_Array,
} from "./utils/StructuresData";
import SideBar from "./components/sideBar";
import { User } from "../objects/user";
import Collectors from "../collectors/objects/collector";
import MapBuildings from "./components/mapBuildings";
import TrainingMenu from "./components/trainingMenu";
import Progressbar, { units } from "./components/progressbar";
import Units from "../collectors/objects/Units";
import { Boosts } from "../objects/boost";
import BarracsMenu from "./components/barracsMenu";
import MessageSection from "./components/messages";
// import MailboxSection from "./components/buzon";
// import BarracsMenu from "./components/barracsMenu";

const boost: Boosts[] = [
  {
  id: 1,
  name: "Mate",
  type: "mate",
  img: (
  <Image 
    key="mate"
    src="/Mate.png"
    width={30}
    height={40}
    alt="png of a mate"
  />),
  quantity: 3,
  boost: 1.5 
},
{
  id: 2,
  name: "Facturas",
  type: "facturas",
  img: (
  <Image 
    key="facturas"
    src="/Facturas.png"
    width={30}
    height={40}
    alt="png of facturas"
  />),
  quantity: 1, 
  boost: 1.2
},

]

export const user: User = {
  id: 1,
  name: "Lando Norris",
  username: "Papi_de_Max",
  password: "f1_E>",
  level: 1,
  boosts: boost, 
  workers: 3
};




export default function Home() {
  const [placerApear, setPlacerApear] = useState(false);
  const [structure, setStructure] = useState<null | number>(null);
  const cursorPosition = useRef({ x: 0, y: 0 });
  const [progressBar, setProgressBar] = useState<boolean | null>(null)
  const [unit, setUnit] = useState<Units>()
  const [quantity, setQuantity] = useState(0)
  const [maxTraining, setMaxTraining] = useState(false)
  const [appliedBoost, setAppliedBoost] = useState<Boosts | null>(null)
  const [barracsMenu, setBarracsMenu] = useState(false)
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: 'http://localhost:3000' });
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorPosition.current = { x: event.clientX, y: event.clientY };
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (structure) {
      setPlacerApear(true);
      document.body.classList.add("cursor-none");
    }
  }, [structure]);

    return (
    <main className="flex min-h-screen items-center justify-center relative">
      {/* <button
        className="absolute bg-blue-500 text-white px-4 py-2 rounded-md"
        style={{ left: "10px", zIndex: 2 }} // Ajusta el valor de 'left' según tus necesidades
        onClick={() => {
          setPlacerApear(!placerApear);
        }}
      >
        Toggle Cursor Marker
      </button> */}
      {/* <div className="absolute flex flex-col justify-center items-center"> 
        <button className="p-2 bg-black text-white border border-white rounded-lg font-bold uppercase duration-200 hover:bg-gray-900 h-10" onClick={handleSignOut}>
          Logout
        </button>
      </div> */}
      
      <div className="absolute bottom-0 right-0 m-4">
          <button className="p-2 bg-black text-white border border-white rounded-lg font-bold uppercase duration-200 hover:bg-gray-900 h-10" onClick={handleSignOut}>
              Logout
          </button>
      </div>

      {/* <button className="bg-zinc-800 px-4 py-2 block mb-2" onClick={() => setShowMessages(!showMessages)}>
        Mensajes
        
      </button> */}

      <MessageSection/>

      {/* {showMessages ?
        <MessageSection/>
      : null} */}

      {/* {showMessages ?
        <div className="bg-zinc-800 px-4 py-2 block mb-2">
          <button onClick={() => setShowMessages(!showMessages)}>
            {showMessages ? 'Close Messages' : 'Open Messages'}
          </button>
          {showMessages && <MessageSection />}
        </div>
      : null} */}
      
      {/* <div className="fixed bottom-0 h-[100px] w-screen m-0 flex flex-row bg-gray-800 shadow-md transition-all duration-300">
          <button className="bg-zinc-800 px-4 py-2 flex mb-2" onClick={() => setShowMessages(true)}>
              Messages
          </button>
      </div>  */}

      {/* {showMessages ? 
          <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0">
              <button onClick={() => setShowMessages(!showMessages)}>
                  {showMessages ? 'Close msg' : 'Open msg'}
              </button>
              {showMessages && 
                  <div className="absolute flex-col justify-between items-center">
                      <MessageSection />
                  </div>
              }
          </div>
      : null} */}

      {barracs_Array.length ? 
      <TrainingMenu 
          user={user} 
          setProgressBar={setProgressBar} 
          setUnit={setUnit} 
          setQuantity={setQuantity} 
          quantity={quantity} 
      />
      : 
      null}

      {progressBar ? 
      <Progressbar 
        running={progressBar} 
        unit={unit!} 
        setProgressBar={setProgressBar} 
        quantity={quantity} 
        barracs={barracs_Array[0]!} 
        setMaxTraining={setMaxTraining} 
        setQuantity={setQuantity}
        boost={appliedBoost}

        /> 
      : 
      null} {/*If this is throwing an error, ad an if inside to check if its undefined and take out the !*/}
      <SideBar user={user} setStructure={setStructure} />
      {barracsMenu? 
        <BarracsMenu 
          barracs={barracs_Array[0]} 
          user={user} 
          setAppliedBoost={setAppliedBoost} 
          progressBar={progressBar}
        /> 
      : null}

      <Placer appearence={placerApear} structure={structure} />
      <MapBuildings 
        setBarracsMenu={setBarracsMenu}
        barracMenu={barracsMenu}
      />
      <Image
        src="/Map_Classic_Scenery.jpg"
        alt="clash_map"
        width={2000}
        height={500}
        onClick={() => {
          if (placerApear) {
            checkTerrain(cursorPosition.current, structure)
              ? addstructure(cursorPosition.current, structure)
              : null;
          }
          // console.log("click en el mapa");
          if (placerApear) {
            setPlacerApear(false);
            setStructure(null);
            document.body.classList.remove("cursor-none");
          } //this if is to hide the cursor marker when the map is clicked, if the conditional doesn`t exist it will always reload the component because of how useState works.
        }}
        className="inset-0 w-full h-full object-cover"
      />

      {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4">
        <button className="px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={() => {setBarracsMenu(barracs_Array.length? !barracsMenu : false)}}
        >
            Barracs
        </button>
      </div> */}
      
    </main>
  );
}

console.log(units)

function checkTerrain( //this function will chech if the terrain is suitable for the structure and taht it is not occupied by another structure
  position: { x: number; y: number },
  structure: number | null
): boolean {
  return true;
}

const collectorArray: Collectors[] = [
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
    boost: false,
    maxCapacity: 200,
    updateTime: new Date()
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
    boost: false,
    maxCapacity: 200,
    updateTime: new Date()
  },
];

function addstructure(
  position: { x: number; y: number },
  structure: number | null
): void {
  switch (structure) {
    case 1:
      // glod_mine_Array.push({
      //   id: glod_mine_Array.length,
      //   position: { x: position.x, y: position.y },
      // });
      break;
    case 2:
      lumber_camp_Array.push({
        id: lumber_camp_Array.length, //ESTO HAY QUE CORREGIRLO A FUTURO
        position: { x: position.x, y: position.y },
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
        boost: false,
        maxCapacity: 200,
        updateTime: new Date()
      });
      break;
    case 3:
      barracs_Array.push({
        //i need seba to check this
        id: barracs_Array.length, //ESTO HAY QUE CORREGIRLO A FUTURO
        name: 'Barracs',
        cost: 5,
        producing: '',
        img: (
          <Image
            key="BattasImg"
            src="/Barracs.png"
            width={60}
            height={70}
            alt="png of the Barracs"
          />
        ),
        prod_per_hour: 1,
        workers: 1,
        level: 1,
        unlock_level: 1,
        maxWorkers: 10,
        maxCap: 5,
        position: { x: position.x, y: position.y }
      });
      // stone_mine_Array.push({
      //   id: stone_mine_Array.length,
      //   position: { x: position.x, y: position.y },
      // });
      break;
  }
}
