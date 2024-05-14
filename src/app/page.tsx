"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import collector, { Collectors } from "./collector";



import I1 from '../../public/Level1_Elixir.png'
import I2 from '../../public/Level2_Elixir.png'
import I3 from '../../public/Level3_Elixir.png'  
import I4 from '../../public/Level4_Elixir.png'  

const images = [I1, I2, I3, I4]

interface CollectorData {
  
  workersAssigned: number;
  extractionCapacity: number;
  production: number;
  improvements: number;
}

export default function Home() {
  const images = [I1, I2, I3, I4]
  const [currentIndex, setCurrentIndex] = useState(0);
  //const { boosts, setBoosts } = useContext(CollectorContext);

  useEffect(() => {
      const intervalId = setInterval(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 3000)
      
      return () => clearInterval(intervalId);
  }, [])

  const [collectorData, setCollectorData] = useState<CollectorData>({
    workersAssigned: 0,
    extractionCapacity: 0,
    production: 0,
    improvements: 0,
  });

  const myCollector: Collectors = {
    type: 'wood',
    workersAssigned: 10,
    maxWorkers: 15,
  };

  const onUpdateCollector = (updatedCollector: Collectors) => {
    //console.log(updatedCollector);
  };
  
  //console.log(boosts);
  const callback = (data: CollectorData) => {
    setCollectorData(data);
  };

  const collectorResult = collector({ collector: myCollector, onUpdateCollector, callback });

  /*
  useEffect(() => {
    const intervalId = setInterval(() => {
      collectorResult.improveExtractionCapacity();
    }, 600);

    return () => clearInterval(intervalId);
  }, [collectorResult]);
  */

  /*
  const onBoostClick = () => {
    if (boosts > 0) {
      setCollectorData(prevData => ({
        ...prevData,
        production: prevData.production * boosts,
      }));
      setBoosts(prevBoosts => prevBoosts - 1);
    }
  };
  */

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold text-center">Elixir Collector</h1>
        
        <p>Workers Assigned: {collectorData.workersAssigned}</p>
        <p>Extraction Capacity: {collectorData.extractionCapacity}</p>
        <p>Production: {collectorData.production}</p>
        <p>Improvements: {collectorData.improvements}</p>
        
        <div className="flex items-center justify-center">
        </div>

        <div className="flex items-center justify-center">
          <Image src={images[currentIndex]} alt="Level 1 Elixir" />
        </div>
      </div>
    </main>
  );
}