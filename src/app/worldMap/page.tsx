"use client";

import React from "react";
import {
  Africa,
  NorthAmerica,
  Asia,
  Europe,
  Australia,
  SouthAmerica,
} from "./continents";
import { postUserInstance } from "./continentLogic";

export default function WorldMap() {
  return (
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
  );
}
