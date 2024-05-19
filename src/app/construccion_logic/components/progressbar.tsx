"use client"

import Units from "@/app/collectors/objects/Units";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ProgressbarProps {
  running: boolean;
  unit: Units
  setProgressBar: Dispatch<SetStateAction<boolean | null>>
}

export default function Progressbar({ running, unit, setProgressBar }: ProgressbarProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(running);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds >= unit.production_time!) {
            setIsRunning(false);
            setProgressBar(false)
            addTroopToDB(unit)
            return prevSeconds;
          } else {
            return prevSeconds + 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, unit.production_time]);

  const progress = (seconds / unit.production_time!) * 100;

  const hourstotal = Math.floor((unit.production_time! || 0) / 3600);
  const minutestotal = Math.floor(((unit.production_time! || 0) % 3600) / 60);
  const secondstotal = (unit.production_time! || 0) % 60;

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  function addTroopToDB(unit: Units) {
    units.push(unit)
  }

  return (
    <div className="absolute flex flex-col justify-center items-center top-0 right-0">
      <div className="relative overflow-hidden w-[200px] h-5 border-2 border-gray-300 rounded-lg bg-gray-200">
        <div className={`h-[100%] bg-black transition-all `} style={{ width: `${progress}%` }}></div>
      </div>
      <span className="">
        {formatTime(Math.floor(seconds / 3600))}:{formatTime(Math.floor((seconds % 3600) / 60))}:{formatTime(seconds % 60)} /
        {formatTime(hourstotal)}:{formatTime(minutestotal)}:{formatTime(secondstotal)} 
      </span>
      <div>
        Currently producting: {unit.name}
      </div>
    </div>
  );
}

const units: Units[] = [

]
