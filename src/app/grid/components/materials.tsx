import React, { useState, useEffect } from "react";
import { useUserStore } from "@/app/store/user";

const PlayerGold = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="fixed top-0 right-1 mr-6 mt-4 flex flex-col justify-center items-center z-10 space-y-4 select-none">
      <div className="relative flex items-center group">
        <img
          src="/Gold.png"
          alt="Gold"
          className="w-12 h-12 object-cover rounded-lg"
        />
        <div className="top-1/2 left-1/2 z-20 flex flex-col items-center justify-center w-[60px] h-[30px] rounded-lg bg-[#f7cd8d] border-[3px] border-[#b7632b]">
          <span className="absolute text-black font-bold">{user.gold}</span>
        </div>
      </div>
      <div className="relative flex items-center group">
        <img
          src="/Lumber.png"
          alt="Lumber"
          className="w-12 h-12 object-cover rounded-lg"
        />
        <div className="top-1/2 left-1/2 z-20 flex flex-col items-center justify-center w-[60px] h-[30px] rounded-lg bg-[#f7cd8d] border-[3px] border-[#b7632b]">
          <span className="absolute text-black font-bold">
            {user.materials[0].quantity}
          </span>
        </div>
      </div>
      <div className="relative flex items-center group">
        <img
          src="/Stone.png"
          alt="Stone"
          className="w-12 h-12 object-cover rounded-lg"
        />
        <div className="top-1/2 left-1/2 z-20 flex flex-col items-center justify-center w-[60px] h-[30px] rounded-lg bg-[#f7cd8d] border-[3px] border-[#b7632b]">
          <span className="absolute text-black font-bold">
            {user.materials[1].quantity}
          </span>
        </div>
      </div>
      <div className="relative flex items-center group">
        <img
          src="/P11.png"
          alt="Stone"
          className="w-12 h-12 object-cover rounded-lg"
        />
        <div className="top-1/2 left-1/2 z-20 flex flex-col items-center justify-center w-[60px] h-[30px] rounded-lg bg-[#f7cd8d] border-[3px] border-[#b7632b]">
          <span className="absolute text-black font-bold">{user.units}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerGold;
