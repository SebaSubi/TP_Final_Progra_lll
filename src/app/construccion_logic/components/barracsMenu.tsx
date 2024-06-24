import Barracs from "@/app/collectors/objects/barracs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TrainingMenu from "./trainingMenu";
import { User } from "@/app/objects/user";
import Image from "next/image";
import { Boosts } from "@/app/objects/boost";

export default function BarracsMenu({
  barracs,
  user,
  setAppliedBoost,
  progressBar
}: {
  barracs: Barracs;
  user: User;
  setAppliedBoost: Dispatch<SetStateAction<Boosts | null>>;
  progressBar: boolean | null
}) {
  const [boostMenu, setBoostMenu] = useState(false);
  const [userBoosts, setUserBoosts] = useState(user.boosts || []);
  const [maxWorkers, setMaxWorkers] = useState(false)
  const [boost, setBoost] = useState<Boosts | null>(null)

  useEffect(() => {
    if(barracs.maxWorkers || user.workers === 0){
      setMaxWorkers(true)
    }
  }, [user.workers])
 
  const handleBoostClick = (index: number) => {
    if(progressBar) {
      setAppliedBoost(userBoosts[index]);
      const newBoosts = [...userBoosts];
      newBoosts[index] = { ...newBoosts[index], quantity: newBoosts[index].quantity - 1 };
      setBoost(newBoosts[index])
      setUserBoosts(newBoosts);
    }
  };

  const handleWorkerClick = () => {
    if(user.workers > 0 && barracs.workers <= barracs.maxWorkers) {
      barracs.workers += 1
      user.workers -= 1
    }
  }




  const BoostMenu = ({
    boost,
    index,
  }: {
    boost: Boosts;
    index: number;
  }) => {
    return (
      <div
        className="hover: cursor-pointer"
        onClick={() => handleBoostClick(index)}
      >
        {boost.img}
        <span>
          {boost.name} <br />
          Increment of: {boost.boost} <br />
          Quantity: {boost.quantity}
        </span>
      </div>
    );
  };

  return (
    <div className="barracs-menu">
      {barracs.name}
      <br />
      Currently Training: {barracs.producing}
      <br />
      Time left: {/* logic for time */}
      <br />
      Max capacity: {barracs.maxCap}
      <br />
      level: {barracs.level}
      <br />
      Workers: {barracs.workers} <br />
      <button onClick={handleWorkerClick}>Assing Worker</button> <br />
      {maxWorkers ? "Max workers reached" : null} <br />
      {boost? `Boost: ${boost.name}` : 'Boost:'}
      <br />
      <button onClick={() => setBoostMenu(!boostMenu)}>Add Boosts</button>
      {boostMenu
        ? userBoosts.map((boost, index) => (
            <BoostMenu boost={boost} index={index} key={index} />
          ))
        : null}
    </div>
  );
}
