"use client";

import Image from "next/image";
import Placer from "./components/objectPlacer";
import { useState, useEffect, useRef } from "react";

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
import Progressbar from "./components/progressbar";
import Units from "../collectors/objects/Units";


export default function Home() {
  const [placerApear, setPlacerApear] = useState(false);
  const [structure, setStructure] = useState<null | number>(null);
  const cursorPosition = useRef({ x: 0, y: 0 });
  const [progressBar, setProgressBar] = useState<boolean | null>(null)
  const [unit, setUnit] = useState<Units>()

  
  // let time = -1;
  // const [timer, setTimer] = useState

  // console.log(glod_mine_Array);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorPosition.current = { x: event.clientX, y: event.clientY };
    };

    // Agrega el event listener cuando el componente se monta
    document.addEventListener("mousemove", handleMouseMove);

    // Limpia el event listener cuando el componente se desmonta
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

  const user: User = {
    id: 1,
    name: "Lando Norris",
    username: "Papi_de_Max",
    password: "f1_E>",
    level: 1,
  };
  // console.log(time)
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
      
      {barracs_Array.length ? <TrainingMenu user={user} setProgressBar={setProgressBar} setUnit={setUnit} /> : null}
      {progressBar ? <Progressbar running={progressBar} unit={unit!} setProgressBar={setProgressBar} /> : null} {/*If this is throwing an error, ad an if inside to check if its undefined and take out the !*/}
      <SideBar user={user} setStructure={setStructure} />
      {/*Here training Menu */}

      <Placer appearence={placerApear} structure={structure} />
      <MapBuildings />
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
      
    </main>
  );
}

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
        maxCap: 20,
        position: {x: 0, y: 0}
      });
      // stone_mine_Array.push({
      //   id: stone_mine_Array.length,
      //   position: { x: position.x, y: position.y },
      // });
      break;
  }
}
