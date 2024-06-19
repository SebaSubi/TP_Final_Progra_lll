"use client";

import React, { useState } from "react";
import {
  Africa,
  NorthAmerica,
  Asia,
  Europe,
  Australia,
  SouthAmerica,
} from "./continents";
import Lottie from "lottie-react";
import * as Flag from "../../../public/Animation - 1718640492316.json";
import { postUserInstance } from "./continentLogic";
import { time } from "console";

export default function WorldMap() {
  const [animate, setAnimate] = useState(false);
  const [waveFlag, setWaveFlag] = useState(true);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function transition() {
    console.log("transition");
    setAnimate(true);
    await sleep(3000);
    setWaveFlag(false);
  }

  return (
    <>
      {waveFlag && (
        <div
          className={`h-screen w-full bg-[#40BBCF] flex items-center justify-center delay-[5000ms] ${
            animate ? "animate-shrinkToCircle" : ""
          }`}
        >
          <h1>Choose a Contient!</h1>
          <Lottie
            animationData={Flag}
            loop={false} // Asegúrate de que la animación no se repita
            autoplay
            style={{ height: 400, width: 400 }}
            onComplete={() => {
              transition();
            }}
          />
        </div>
      )}
      <div className="h-full w-full backdrop-blur-sm bg-white">
        <div className="flex flex-col h-screen w-screen bg-[#124556]">
          <h1 className="font-bold text-center text-4xl w-full pt-5 absolute select-none">
            Select a Continent
          </h1>
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1160.000000 746.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,746.000000) scale(0.200000,-0.200000)"
              stroke="none"
            >
              {/* africa */}
              <Africa />
              {/* north America */}
              <NorthAmerica />
              {/* asia */}
              <Asia />
              {/* europa */}
              <Europe />
              {/* oceania */}
              <Australia />
              {/* south America */}
              <SouthAmerica />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
