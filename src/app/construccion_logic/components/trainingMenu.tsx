import Units from "@/app/collectors/objects/Units"
import Barracs from "@/app/collectors/objects/barracs"
import { User } from "@/app/objects/user"
import Image from "next/image"
import { Dispatch, SetStateAction, use, useEffect, useState } from "react"
import { barracs_Array } from "../utils/StructuresData"
import BarracsMenu from "./barracsMenu"
import { Boosts } from "@/app/objects/boost"

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
    unlock_level: 2
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
    unlock_level: 3
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
    production_time: 5,
    level: 1,
    unlock_level: 1
  },
]



export default function TrainingMenu(
  { user,
    quantity,
    setProgressBar,
    setUnit,
    setQuantity,
  }: 
  { 
    user: User, 
    setProgressBar: Dispatch<SetStateAction<boolean | null>>, 
    setUnit: Dispatch<SetStateAction<Units | undefined>>,
    setQuantity: Dispatch<SetStateAction<number>>,
    quantity: number,

  }
) {
  const [trainingMenu, setTrainingMenu] = useState(true)
  // const [maxCapacity, setMaxCapacity] = useState(false)
  // const [trainingOptions, setTrainingOptions] = useState(false)

  // function progressBarLogic() {
  //   if(progressbar === true){
  //     return null
  //   }
  //   else {
  //     return true
  //   }
  // }
  // useEffect(() => {
  //   console.log("we are in the use effect" + maxCapacity)
  //   setMaxCapacity(true)
  // }, [maxTraining, setMaxCapacity])

  const TrainingMenuIcons = (
    { units, user }: {units: Units, user: User}
  ) => {
    if(user.level >= units.unlock_level) {
      return(
        <div
          className="sidebar-icon group"
          onClick={() => {
            setProgressBar(true);
            // setTrainingOptions(true)
            setQuantity(quantity + 1)
            setUnit(units)
            // time = units.production_time
          }}
        >
          {units.img}
          <span className="sidebar-name group-hover:scale-100">
        {units.name}
        <br />
        Cost: {units.cost}
        <br />
        Time: {units.production_time}
        <br />
        Quantity x1
    </span>
        </div>
      )
    // } else if(user.level >= units.unlock_level && maxCapacity ){
    //   console.log("we are in")
    //   return (
    //     <div className="min-lev-req group ">
    //       <i className="opacity-20">{units.img}</i>
    //       <span className="sidebar-name group-hover:scale-100 opacity-80 flex flex-col">
    //         <div>{`You have reached the max training limit of yout barracs: ${barracs.maxCap}`}</div>
    //         <div>Upgrade your barracs to increase your capacity</div>
    //       </span>
    //     </div>
    //   )
    }
    
     else {
      return(
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



  return (
    <main>
      <div
        className={`fixed bottom-0 h-[100px] w-screen m-0 flex flex-row bg-gray-800 shadow-md  transition-all duration-300 ${
          trainingMenu ? "translate-y-full" : "translate-y-0"
        }`}
      >
        {units_Array.map((units, index) => (
          <TrainingMenuIcons units={units} user={user} key={index} />

        ))}

            
      
      </div>
      <div >
        <button
          className={` fixed bottom-[105px] left-[47%] transition-all duration-300 ${
            trainingMenu ? "translate-y-[105px]" : "translate-y-0"
          }`}
          onClick={() => {
            setTrainingMenu(!trainingMenu);
          }}
        >
          Training Menu
        </button>

      </div>
    </main>
  );

}