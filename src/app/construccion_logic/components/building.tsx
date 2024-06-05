import Image from "next/image";
import Collectors from '@/app/collectors/objects/collector'
import { updateData } from '@/app/logic/production'


export default function BuildingDetails(
  { collector, state, buildingId }: { collector: any, state: boolean, buildingId: number}
) {
  // console.log(collector.updateTime)
  // collector.updateTime = new Date()
  // const collectorData = updateData(collector)
  state? collector = updateData(collector): null
  // console.log(collectorData)
  // console.log(new Date())
  
  



  if(state && buildingId === collector.id) {
    return(
      <div className="show-detail">
        {collector.name}<br />
        Production per minute: {collector.prod_per_hour}<br />
        Workers: {collector.workers} <br />
        capacity: {collector.capacity} / {collector.maxCapacity}
      </div>

    )
  } else {
    return null
  }

}