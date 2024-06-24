import { useBoostStore } from "@/app/store/boosts";
import { useUserStore } from "@/app/store/user";
import { get } from "http";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

export default function BoostMenu(
  ) {
  const [boostApplied, setBoostApplied] = useState(false);
  const setBoost = useBoostStore(state => state.setBoost);
  const updateUserBoost = useUserStore(state => state.useBoost)
  const boosts = useBoostStore(state => state.boosts);
  // const boost = useBoostStore(state => state.boost);


  function setAndUpdateBoost(name: string) {
    //We set the boost
    setBoost(name);
    //We delete the boost from the database
    const newUser = updateUserBoost(name);
  }

  return (
    <div className={`absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[${boosts.length * 100}px] w-[35%] bg-[#f7cd8d] border-[3px] border-[#b7632b] z-50 items-center justify-center`}>
    {boosts.map((boost, index) => (
      <div className=" flex flex-row justify-center p-1" key={index}>
        <div className="absolute left-0 bottom-5">
          <Image
            key={index}
            src={boost.img}
            alt={boost.name}
            width={60}
            height={40}
          />
        </div>
        <div className="relative flex items-center justify-center hover:brightness-75 active:transition-none active:scale-90 mt-5" 
          onClick={() => {
            setAndUpdateBoost(boost.name);
            setBoostApplied(true);
          }}
        >
          <p className="absolute inset-0 flex items-center justify-center text-[#6a1e07] font-comic">Apply</p>
          <Image
            src="/BuildButton.png"
            width={70}
            height={70}
            alt="buildingButton"
            className="hover:brightness-75"
          />
        </div>
        <div className="absolute right-2 flex flex-col pl-6">
          <span className="font-comic mt1 text-sm text-[#6a1e07]">Name: {boost.name}</span>
          <span className="font-comic mt1 text-sm text-[#6a1e07]">Quantity: {boost.quantity}</span>
        </div>
      </div>
    ))}
  </div>
  );
}


// { setBoostMenu }: 
//   {
//     setBoostMenu: Dispatch<SetStateAction<boolean>>
//   }