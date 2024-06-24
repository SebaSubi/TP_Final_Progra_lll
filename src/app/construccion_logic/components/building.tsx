import Image from "next/image";
import Collectors from '@/app/collectors/objects/collector'
import { updateData } from '@/app/logic/production'


export default function BuildingDetails(
  { collector, state, buildingId }: { collector: any, state: boolean, buildingId: number}
) {
  state? collector = updateData(collector): null
  
  



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