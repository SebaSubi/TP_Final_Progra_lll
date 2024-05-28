"use client";

import Units from "@/app/collectors/objects/Units";
import Barracs from "@/app/collectors/objects/barracs";
import { Boosts } from "@/app/objects/boost";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ProgressbarProps {
  running: boolean;
  unit: Units;
  setProgressBar: Dispatch<SetStateAction<boolean | null>>;
  quantity: number;
  barracs: Barracs;
  setMaxTraining: Dispatch<SetStateAction<boolean>>;
  setQuantity: Dispatch<SetStateAction<number>>;
  boost: Boosts | null;
}

export default function Progressbar({
  running,
  unit,
  quantity,
  setProgressBar,
  barracs,
  setMaxTraining,
  setQuantity,
  boost,
}: ProgressbarProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(running);
  let maxReached = false;

  if (quantity >= barracs.maxCap!) {
    quantity = barracs.maxCap!;
    maxReached = true;
  }

  useEffect(() => {
    console.log("useEffect called");
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds >= unit.production_time * quantity!) {
            setIsRunning(false);
            setProgressBar(false);
            console.log("addTroopToDB called with quantity:", quantity);
            addTroopToDB(unit, quantity);
            setQuantity(0);
            return prevSeconds;
          } else if (boost) {
            return prevSeconds + boost.boost * barracs.workers;
          } else {
            return prevSeconds + 1 * barracs.workers;
          }
        });
      }, 1000);
    }

    return () => {
      console.log("Cleanup interval");
      clearInterval(intervalId);
    };
  }, [isRunning, unit.production_time, quantity, boost, barracs.workers]);

  let progress = (seconds / (unit.production_time * quantity!)) * 100;

  const hourstotal = Math.floor((unit.production_time * quantity! || 0) / 3600);
  const minutestotal = Math.floor(((unit.production_time * quantity! || 0) % 3600) / 60);
  const secondstotal = (unit.production_time * quantity! || 0) % 60;

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  console.log("Current quantity:", quantity);

  function addTroopToDB(unit: Units, quantity: number) {
    console.log("addTroopToDB executing, adding", quantity, "units.");
    for (let i = 0; i < quantity; i++) {
      units.push(unit);
    }
  }

  const MaxTraining = () => {
    return (
      <span>
        You have reached the max <br />
        training limit of: {barracs.maxCap}
      </span>
    );
  };

  return (
    <div className="absolute flex flex-col justify-center items-center top-0 right-0">
      <div className="relative overflow-hidden w-[200px] h-5 border-2 border-gray-300 rounded-lg bg-gray-200">
        <div className={`h-[100%] bg-black transition-all`} style={{ width: `${progress}%` }}></div>
      </div>
      <span className="">
        {formatTime(Math.floor(seconds / 3600))}:{formatTime(Math.floor((seconds % 3600) / 60))}:{formatTime(Math.floor(seconds % 60))} /
        {formatTime(hourstotal)}:{formatTime(minutestotal)}:{formatTime(secondstotal)}
      </span>
      <div>
        Currently producing: {quantity}x of: {unit.name} <br />
        Workers: {barracs.workers}
        {maxReached ? <MaxTraining /> : null}
      </div>
    </div>
  );
}

export const units: Units[] = [];