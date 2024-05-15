import Barracs from "@/app/collectors/objects/barracs"
import { useState } from "react"
import TrainingMenu from "./trainingMenu"





export default function BarracsMenu(
  { barracs, state, barracsId }: { barracs: Barracs, state: boolean, barracsId: number }
) {
  const [traningMenu, setTrainingMenu] = useState(false)
  // const collectorData = updateData(collector)
  // collector = updateData(collector)
  console.log(traningMenu)
  const ShowMenu = () => {


    return traningMenu ? <TrainingMenu /> : <></>
  }

  
  



  if(state && barracsId === barracs.id) {
    return(
      <div className="show-detail">
        {barracs.name}<br />
        Currently Training: {barracs.producing}<br />
        Time left: {/* logic for time */}<br />
        Max capacity: {barracs.maxCap}<br />
        level: {barracs.level}<br />
        Workers: {barracs.workers} <br />
        Boost: {/* boost logic */} <br />
        <button onClick={() => {setTrainingMenu(!traningMenu)}}>Train</button>
        <ShowMenu />
        {/* capacity: {barracs.capacity} / {barracs.maxCapacity} */}
      </div>

    )
  } else {
    return null
  }

}

