import { time } from "console";
import Collectors from "../collectors/objects/collector";
import { cookies } from "next/headers";


export function updateData(collector: Collectors) {
  const currentTime: Date = new Date()
  // console.log("This is the current time: " + currentTime + "")

  // const timeDifference: number = currentTime.getMinutes() - collector.updateTime!.getMinutes()
  const timeDifference = 5
  // console.log(timeDifference)
  // return timeDifference

  const productionPerHour: number = collector.workers + collector.level;
  collector.prod_per_hour = productionPerHour

  collector.capacity! = productionPerHour * timeDifference

  return collector

}

// resourceLogic.tsx

// "use client";

// import React, { useState, useEffect, useContext } from 'react';
// import { CollectorContext } from "./collectorContext";
// import { Collectors } from "../objects/collector";

// const Collector: React.FC<Collectors> = (props) => {
//     const { boosts, setBoosts } = useContext(CollectorContext); 
//     const [production, setProduction] = useState(0);
//     const [workersAssigned, setWorkersAssigned] = useState(props.workersAssigned || 0);
//     const [improvements, setImprovements] = useState(0);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             const newProduction = workersAssigned * 10 * (improvements + 1); // Multiplica la producción por el número de mejoras
//             setProduction(prevProduction => prevProduction + newProduction);
//         }, 1000);
    
//         return () => clearInterval(timer); 
//     }, [props, workersAssigned, improvements]);

//     const improveExtractionCapacity = () => { //para mejorar la capacidad de extracción de un recolector
//         if (improvements < 5 && boosts > 0) {  //solo se pueden hacer 5 mejoras y se necesita al menos 1 boost
//             setImprovements(prevImprovements => prevImprovements + 1); //incrementa el número de mejoras
//             setBoosts(prevBoosts => prevBoosts - 1); //decrementa el número de boosts
//         }
//     };

//     //para actualizar el número de trabajadores asignados a un recolector 
//     const handleWorkersAssignedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newWorkersAssigned = Number(event.target.value);
//         if (props.maxWorkers !== undefined && newWorkersAssigned > props.maxWorkers) {
//             setWorkersAssigned(props.maxWorkers);
//         } else {
//             setWorkersAssigned(newWorkersAssigned);
//         }
//     };

//     return (
//         <div className="text-1xl font-bold border-2 border-gray-300 p-2 mb-2">
//             <h2>--- {props.type.charAt(0).toUpperCase() + props.type.slice(1)} Collector: ---</h2>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <p>Workers assigned: </p>
//                 <input 
//                     type="number" 
//                     value={workersAssigned} 
//                     onChange={handleWorkersAssignedChange} 
//                     style={{ width: '70px', marginLeft: '10px', color: 'black', backgroundColor: 'white' }}
//                 />
//             </div>
//             <p>Extraction capacity /sec: {10 * workersAssigned}</p>
//             <p>Production: {production}</p>
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <button className="align-items-center" onClick={improveExtractionCapacity} style={{ border: '1px solid orange', padding: '5px 10px', borderRadius: '120px', marginTop: '6px' }}>Boost</button>
//             </div>        
//         </div>
//     );
// };

// export default Collector;