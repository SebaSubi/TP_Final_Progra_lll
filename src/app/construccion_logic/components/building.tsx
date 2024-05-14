import Image from "next/image";
import Collectors from '@/app/collectors/objects/collector'


export default function BuildingDetails(
  { collector, state, buildingId }: { collector: Collectors, state: boolean, buildingId: number }
) {




  if(state && buildingId === collector.id) {
    return(
      <div className="show-detail">
        {collector.name}<br />
        Production per hour: {collector.prod_per_hour}<br />
        Cost: {collector.cost}<br />
        Workers: {collector.workers}
      </div>

    )
  } else {
    return null
  }

}