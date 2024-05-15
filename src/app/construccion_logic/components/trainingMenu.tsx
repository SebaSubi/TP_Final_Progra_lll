import Units from "@/app/collectors/objects/Units"
import Barracs from "@/app/collectors/objects/barracs"
import { User } from "@/app/objects/user"
import Image from "next/image"
import { useState } from "react"
import { barracs_Array } from "../utils/StructuresData"

const units_Array: Units[] = [
  {
    id: 1,
    name: "Archer",
    img: (
      <Image
        key="Archer"
        src="/Archer.png"
        width={60}
        height={70}
        alt="png of Archer" 
      />
    ),
    cost: 100,
    production_time: 200,
    level: 1,
    unlock_level: 1
  },
  {
    id: 2,
    name: "Swordsman",
    img: (
      <Image
        key="Archer"
        src="/Swordsman.png"
        width={60}
        height={70}
        alt="png of Swordsman" 
      />
    ),
    cost: 100,
    production_time: 200,
    level: 1,
    unlock_level: 1
  },
  {
    id: 3,
    name: "Lancer",
    img: (
      <Image
        key="Archer"
        src="/Lancer.png"
        width={60}
        height={70}
        alt="png of Lancer" 
      />
    ),
    cost: 100,
    production_time: 200,
    level: 1,
    unlock_level: 1
  },
  {
    id: 4,
    name: "Worker",
    img: (
      <Image
        key="Archer"
        src="/Worker.png"
        width={60}
        height={70}
        alt="png of Worker" 
      />
    ),
    cost: 100,
    production_time: 200,
    level: 1,
    unlock_level: 1
  }
]



export default function TrainingMenu(
  { user }: { user: User }
) {
  const [trainingMenu, setTrainingMenu] = useState(true)

  const TrainingMenuIcons = (
    { units, user }: {units: Units, user: User}
  ) => {
    if(user.level >= units.unlock_level) {
      return(
        <div
          className="sidebar-icon group"
          // onClick={() => {
          //   setTrainingMenu(units.id);
          // }}
        >
          {units.img}
          <span className="sidebar-name group-hover:scale-100">
            {units.name}
            <br />
            Cost: {units.cost}
            <br />
            Time: {units.production_time}
            <br />
            Amout: x10
          </span>
        </div>
      )
    }
    else {
      return (
        <div className="min-lev-req group ">
          <i className="opacity-20">{units.img}</i>
          <span className="sidebar-name group-hover:scale-100 opacity-80 flex flex-col">
            <div>{`You must be Level: ${units.unlock_level} to unlock ${units.name}`}</div>
            <div>{`Current Level: ${user.level}`}</div>
          </span>
        </div>
      )
    }
  }

  // const collectorData = updateData(collector)
  // collector = updateData(collector)

  // return (
  //   <div className="flex flex-col">
  //     <h2> Train: </h2>
  //     <div className="flex flex-row">
  //       {units.map((unit, index) => (
  //         <div className="flex flex-row justify-center items-center w-22 h-22 bg-black rounded-md m-2" key={index}>
  //           <div className="flexx flex-col bg-black">
  //             Cost: {unit.cost}<br />
  //             Time: {unit.production_time}<br />
  //             Amount: x10
  //           </div>
  //           <i className="bg-black">{unit.img}</i>
  //         </div>

  //       ))}
  //     </div>
  //   </div>
  // )
  



  // if(state && barracsId === barracs.id) {
  //   return(
  //     <div className="show-detail">
  //       {/* {barracs.name}<br />
  //       Currently Training: {barracs.producing}<br />
  //       Time left: {/* logic for time */}<br />
  //       Max capacity: {barracs.maxCap}<br />
  //       level: {barracs.level}<br />
  //       Workers: {barracs.workers} <br />
  //       Boost: {/* boost logic */} <br />
  //       <button >Train</button> */}
        
  //       {/* capacity: {barracs.capacity} / {barracs.maxCapacity} */}
  //     </div>

  //   )
  // } else {
  //   return null
  // }

  return (
    <main>
      <div
        className={`fixed top-0 left-[-100px] h-screen w-[100px] m-0 flex flex-col bg-gray-800 shadow-md  transition-all duration-300 ${
          trainingMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {units_Array.map((units, index) => (
          <TrainingMenuIcons units={units} user={user} key={index} />
        ))}
      </div>
      <div>
        <button
          className={` fixed top-5 left-[5px] transition-all duration-300 ${
            trainingMenu ? "translate-x-0" : "translate-x-[100px]"
          }`}
          onClick={() => {
            setTrainingMenu(!trainingMenu);
          }}
        >
          Units
        </button>
      </div>
    </main>
  );

}