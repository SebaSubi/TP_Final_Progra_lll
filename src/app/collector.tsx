"use client";
import React, { useState, useEffect, useRef, useContext } from 'react';


const createCollector = (collector: Collectors): CollectorProps => {
  // Initialize the state and functions for this collector
  const [production, setProduction] = useState(0);
  const [workersAssigned, setWorkersAssigned] = useState(collector.workersAssigned || 0);
  const [improvements, setImprovements] = useState(collector.improvements || 0);
  const [extractionCapacity, setExtractionCapacity] = useState(10 * (collector.workersAssigned || 0));    
  
  //const [improvements, setImprovements] = useState(0);
  


  // Define the functions for this collector
  const onUpdateCollector = (updatedCollector: Collectors) => {
    // Update the state based on the updated collector
    setProduction(updatedCollector.production || 0);
    setWorkersAssigned(updatedCollector.workersAssigned || 0);
    setExtractionCapacity(10 * (updatedCollector.workersAssigned || 0));
    setImprovements(updatedCollector.improvements || 0);
  };

  // Return the collector props
  return {
    collector,
    onUpdateCollector,
  };
};


interface CollectorContextProps {
  totalProduction: number;
  setTotalProduction: React.Dispatch<React.SetStateAction<number>>;
  boosts: number; // Añade esta línea
  setBoosts: React.Dispatch<React.SetStateAction<number>>;
}

export const CollectorContext = React.createContext<CollectorContextProps>({
  totalProduction: 0,
  setTotalProduction: () => {},
  boosts: 0, // Añade esta línea
  setBoosts: () => {}, // Añade esta línea
});



export interface Collectors {
  type: 'wood' | 'stone';
  workersAssigned?: number;
  maxWorkers?: number;
  image?: string;
  extractionCapacity?: number;
  production?: number;
  improvements?: number;
}

interface CollectorProps {
  collector: Collectors;
  onUpdateCollector: (updatedCollector: Collectors) => void;
}

const collector = ({ collector, onUpdateCollector, callback }: CollectorProps & { callback: (data: any) => void }) => {
  const [production, setProduction] = useState(0);
  const [workersAssigned, setWorkersAssigned] = useState(collector.workersAssigned || 0);
  const [extractionCapacity, setExtractionCapacity] = useState(10 * (collector.workersAssigned || 0));    
  const [improvements, setImprovements] = useState(0);

  //const { boosts, setBoosts } = useContext(CollectorContext);

  const extractionCapacityRef = useRef(extractionCapacity);
  const workersAssignedRef = useRef(workersAssigned);



  useEffect(() => {
    extractionCapacityRef.current = extractionCapacity;
    workersAssignedRef.current = workersAssigned;
  }, [extractionCapacity, workersAssigned]);


  useEffect(() => {
    const timer = setInterval(() => {
        const newProduction = workersAssignedRef.current * 10 * (improvements + 1);
        setProduction(prevProduction => prevProduction + newProduction);
    }, 1000);

    return () => clearInterval(timer); 
}, []);


/*
const improveExtractionCapacity = () => {
  if (improvements < 5 && boosts > 0 && workersAssigned > 0) {
    setImprovements(prevImprovements => prevImprovements + 1);
    setExtractionCapacity(prevCapacity => prevCapacity + 10); // Increase extraction capacity
    setBoosts(prevBoosts => prevBoosts - 1);
  }
};
*/


  /*
  const improveExtractionCapacity = () => {
      if (totalProduction >= 500) {
          setTotalProduction(totalProduction - 500);
          setExtractionCapacity(prevCapacity => prevCapacity + 1); 
          setImprovements(prevImprovements => prevImprovements + 1);
  
          setTimeout(() => {
              setExtractionCapacity(prevCapacity => prevCapacity - improvements);
              setImprovements(0);
          }, 180000);
      } else {
          alert('No tienes suficientes recursos para mejorar la capacidad de extracción.');
      }
  };
  */

  useEffect(() => {
    const contextValue = {
      type: collector.type,
      workersAssigned,
      extractionCapacity,
      production: production * 10,
      improvements,
      
    };
    callback(contextValue);
  }, [collector, workersAssigned, extractionCapacity, production, improvements]);

  
    return (
      
      <div>
        <h2>Type: {collector.type}</h2>
        <p>Workers Assigned: {workersAssigned}</p>
        <p>Extraction Capacity: {extractionCapacity}</p>
        <p>Production: {production * 10}</p>
        <p>Improvements: {improvements}</p>
        
        
        
        <input type="number" value={workersAssigned}  />
      </div>
      
    );
  
}

export default collector;
