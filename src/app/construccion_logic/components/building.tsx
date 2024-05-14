import Image from "next/image";
import Collectors from '@/app/collectors/objects/collector'
import { updateData } from '@/app/logic/production'


export default function BuildingDetails(
  { collector, state, buildingId }: { collector: Collectors, state: boolean, buildingId: number}
) {
  collector.updateTime = new Date()
  const collectorData = updateData(collector)
  collector = updateData(collector)
  console.log(collectorData)
  // console.log(new Date())
  
  



  if(state && buildingId === collector.id) {
    return(
      <div className="show-detail">
        {collector.name}<br />
        Production per hour: {collector.prod_per_hour}<br />
        Cost: {collector.cost}<br />
        Workers: {collector.workers} <br />
        capacity: {collector.capacity}
      </div>

    )
  } else {
    return null
  }

}