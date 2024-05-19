"use client";

import Image from "next/image";
import Placer from "./components/objectPlacer";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import { useSession, signOut } from "next-auth/react";
import { glod_mine_Array, lumber_camp_Array, stone_mine_Array } from "./utils/StructuresData";
import SideBar from "../construccion/mode/sideBar";
import { User } from "../objects/user";
import Collectors from "../collectors/objects/collector";



export default function Home() {
  const [placerApear, setPlacerApear] = useState(false);
  const [structure, setStructure] = useState<null | number>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: 'http://localhost:3000' });
  };

  // console.log(glod_mine_Array);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    // Agrega el event listener cuando el componente se monta
    document.addEventListener("mousemove", handleMouseMove);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if(structure){
      setPlacerApear(true);
    }
  },[structure])

  const user: User = {
    id: 1,
    name: 'Lando Norris',
    username: 'Papi_de_Max',
    password: 'f1_E>',
    level: 1
  }

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
        <button className="bg-zinc-800 px-4 py-2 block mb-2" onClick={handleSignOut}>
        Logout
      </button>
      
      <SideBar user={user} setStructure={setStructure}/>
      <Placer appearence={placerApear} structure={structure} />
      <Image
        src="/Map_Classic_Scenery.jpg"
        alt="clash_map"
        width={2000}
        height={500}
        onClick={() => {
          if (placerApear) {
            checkTerrain(cursorPosition,structure) ? addstructure(cursorPosition,structure) : null;
          }
          // console.log("click en el mapa");
          if (placerApear) {
            console.log(lumber_camp_Array)
             setPlacerApear(false);
             setStructure(null);
          }//this if is to hide the cursor marker when the map is clicked, if the conditional doesn`t exist it will always reload the component because of how useState works.
        }}
        className="inset-0 w-full h-full object-cover"
      />
    </main>
  );
}

function checkTerrain(position: { x: number; y: number }, structure:number | null): boolean {
  return true;
}


const collectorArray: Collectors[] = [
  {
    id: 1,
    name: 'Gold Collector',
    img: <Image 
    key='GoldMine'
    src='/Gold_Mine1.png'
    width={60}
    height={70}
    alt='png of Gold Mine'
    />,
    cost: 100,
    prod_per_hour: 1,
    workers: 1,
    level: 1,
    unlock_level: 2,
    maxWorkers: 1
  },
  {
    id: 2,
    name: 'Wood Collector',
    img: <Image 
    key='WoodCollecor'
    src='/Elexir_Collector.png'
    width={60}
    height={70}
    alt='png of Wood Collector'
    />,
    cost: 100,
    prod_per_hour: 1,
    workers: 1,
    level: 1,
    unlock_level: 1,
    maxWorkers: 1
  }

]



function addstructure(position: { x: number; y: number }, structure: number | null): void {
  switch(structure){
    case 1:
      glod_mine_Array.push({
        id: glod_mine_Array.length,
        position: { x: position.x, y: position.y },
        });
        break;
    case 2:
      lumber_camp_Array.push({
        id: lumber_camp_Array.length,   //ESTO HAY QUE CORREGIRLO A FUTURO
        position: { x: position.x, y: position.y },
        });
        break;
    case 3:
      stone_mine_Array.push({
        id: stone_mine_Array.length,
        position: { x: position.x, y: position.y },
        });
        break;
  }
}
